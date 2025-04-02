import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { SketchPicker } from "react-color";

const Input = (props) => <input className="border p-2 rounded w-full" {...props} />;
const Button = (props) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full" {...props} />
);

export default function QRGenerator() {
  const [text, setText] = useState("https://example.com");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [logo, setLogo] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mr.Freeman | QR კოდის გენერატორი</h1>
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 flex flex-col gap-4">

        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="შეიყვანე ტექსტი ან ლინკი"
        />

        <label className="font-medium">ფონის ფერი</label>
        <SketchPicker color={bgColor} onChangeComplete={(color) => setBgColor(color.hex)} />

        <label className="font-medium">კოდის ფერი</label>
        <SketchPicker color={fgColor} onChangeComplete={(color) => setFgColor(color.hex)} />

        <Input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="ლოგოს URL (არასავალდებულო)"
        />

        <div className="text-center text-gray-600 text-sm">ლოგო გამოჩნდება QR კოდში ცენტრში</div>

        <div className="flex justify-center">
          <QRCode value={text} size={200} bgColor={bgColor} fgColor={fgColor} logoImage={logo || undefined} />
        </div>

        <Button onClick={() => downloadQR()}>ჩამოტვირთე QR</Button>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-8">
        © 2025 Mr.Freeman – შექმნილია საქართველოდან სიყვარულით
      </footer>
    </div>
  );

  function downloadQR() {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
