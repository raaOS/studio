'use server';

/**
 * @fileOverview Implements a Genkit flow for creating a real Google Drive folder.
 *
 * - createOrderFolder - Creates a folder for a given order in Google Drive.
 * - CreateOrderFolderInput - The input type for the createOrderFolder function.
 * - CreateOrderFolderOutput - The return type for the createOrderFolder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {google} from 'googleapis';

const CreateOrderFolderInputSchema = z.object({
  orderId: z.string().describe('The ID of the order.'),
  customerName: z.string().describe('The name of the customer.'),
  folderTemplate: z.string().describe('The template for the folder name, e.g., "[OrderID] - [CustomerName]".'),
});
export type CreateOrderFolderInput = z.infer<typeof CreateOrderFolderInputSchema>;

const CreateOrderFolderOutputSchema = z.object({
  success: z.boolean().describe('Whether the folder was created successfully.'),
  folderName: z.string().describe('The name of the created folder.'),
  folderId: z.string().optional().describe('The ID of the created Google Drive folder.'),
  folderUrl: z.string().optional().describe('The URL to access the created Google Drive folder.'),
  error: z.string().optional().describe('Error message if the operation failed.'),
});
export type CreateOrderFolderOutput = z.infer<typeof CreateOrderFolderOutputSchema>;

export async function createOrderFolder(input: CreateOrderFolderInput): Promise<CreateOrderFolderOutput> {
  return createOrderFolderFlow(input);
}

const createOrderFolderFlow = ai.defineFlow(
  {
    name: 'createOrderFolderFlow',
    inputSchema: CreateOrderFolderInputSchema,
    outputSchema: CreateOrderFolderOutputSchema,
  },
  async (input) => {
    const serviceAccountJson = process.env.DRIVE_SERVICE_ACCOUNT_JSON;
    const parentFolderId = process.env.DRIVE_PARENT_FOLDER_ID;

    if (!serviceAccountJson) {
      const errorMsg = 'DRIVE_SERVICE_ACCOUNT_JSON environment variable is not set.';
      console.error(errorMsg);
      return { success: false, folderName: '', error: errorMsg };
    }
    
    if (!parentFolderId) {
       const errorMsg = 'DRIVE_PARENT_FOLDER_ID environment variable is not set.';
       console.error(errorMsg);
       return { success: false, folderName: '', error: errorMsg };
    }

    try {
        const credentials = JSON.parse(serviceAccountJson);
        const auth = new google.auth.JWT(
            credentials.client_email,
            undefined,
            credentials.private_key,
            ['https://www.googleapis.com/auth/drive']
        );

        const drive = google.drive({ version: 'v3', auth });

        const folderName = input.folderTemplate
            .replace('[OrderID]', input.orderId)
            .replace('[CustomerName]', input.customerName);

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId],
        };

        const file = await drive.files.create({
            requestBody: fileMetadata,
            fields: 'id, webViewLink',
        });
        
        console.log(`Successfully created folder in Google Drive. ID: ${file.data.id}`);

        return { 
            success: true,
            folderName: folderName,
            folderId: file.data.id || '',
            folderUrl: file.data.webViewLink || '',
        };
    } catch (error: any) {
      console.error('Error creating Google Drive folder:', error);
      const errorMessage = error.response?.data?.error?.message || error.message || 'An unexpected error occurred.';
      return { 
        success: false,
        folderName: '',
        error: `Google Drive API Error: ${errorMessage}`,
      };
    }
  }
);
