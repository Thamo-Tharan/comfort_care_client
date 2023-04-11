import { BeambagUpload } from "../../Components/imageUploads/beambag";
import { BedUpload } from "../../Components/imageUploads/bed";
import { ChairUpload } from "../../Components/imageUploads/chair";
import { DressingTableUpload } from "../../Components/imageUploads/dressingTable";
import { SofaUpload } from "../../Components/imageUploads/sofa";
import { HeaderOrder } from "../../Components/Order/Header";
import '../../Styles/uploads/index.css'
export const Uploads = () => {
  return (
    <>
      <HeaderOrder />
      <div id="uploads_root">
        <SofaUpload />
        <BeambagUpload />
        <ChairUpload />
        <BedUpload />
        <DressingTableUpload />
      </div>
    </>
  );
};
