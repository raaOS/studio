import React from "react";

export default function TelegramAutomationPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">
          Otomasi Telegram
        </h1>
        <p className="text-muted-foreground">
          Kelola notifikasi otomatis dan pengaturan bot Telegram Anda.
        </p>
      </div>

      {/* Contoh tambahan komponen untuk pengaturan */}
      <div className="border p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold">Pengaturan Bot</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tambahkan token bot dan ID chat Anda.
        </p>

        {/* Form sederhana */}
        <form className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Token Bot</label>
            <input
              type="text"
              placeholder="123456:ABC-DEF..."
              className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">ID Chat</label>
            <input
              type="text"
              placeholder="123456789"
              className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  );
}
