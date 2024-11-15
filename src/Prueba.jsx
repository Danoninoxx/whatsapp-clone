async function Prueba(UID) {
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/10.1.1",
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZG5jZWdnbHdlYWZvZmlwa3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwNDEsImV4cCI6MjA0NDA3OTA0MX0.usSaU9Ff74UTnPVjExUs0t68TN1T98O97IcbrBLDQKw",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZG5jZWdnbHdlYWZvZmlwa3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwNDEsImV4cCI6MjA0NDA3OTA0MX0.usSaU9Ff74UTnPVjExUs0t68TN1T98O97IcbrBLDQKw",
      Range: "0-9",
    },
  };

  const response = await fetch(
    `https://zudncegglweafofipksu.supabase.co/rest/v1/contacto?seguidor=eq.${UID}&select=*`,
    options
  );
  const data = await response.json();
  console.log(data);
}
const UID = "3d3d87ed-ff80-42ad-8bf3-a50f32be6f88";
Prueba(UID);

export default Prueba
