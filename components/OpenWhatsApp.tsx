"use client";

const OpenWhatsApp = ({ fileId }: { fileId: string }) => {
  const shareOnWhatsApp = () => {
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&mode=admin`;
    const whatsappLink = `https://api.whatsapp.com/send?text=Download this file: ${encodeURIComponent(fileUrl)}`;

    window.open(whatsappLink, "_blank"); // Open WhatsApp in a new tab
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="py-2 rounded-lg p-0 m-0 bg-transparent text-black no-underline"
    >
      WhatsApp
    </button>
  );
};

export default OpenWhatsApp;
