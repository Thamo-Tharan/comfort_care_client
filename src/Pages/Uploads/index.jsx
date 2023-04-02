import { BeambagUpload } from "../../Components/imageUploads/beambag"
import { BedUpload } from "../../Components/imageUploads/bed"
import { ChairUpload } from "../../Components/imageUploads/chair"
import { DressingTableUpload } from "../../Components/imageUploads/dressingTable"
import { SofaUpload } from "../../Components/imageUploads/sofa"
export const Uploads=()=>{
    return (
        <>
        <SofaUpload/>
        <BeambagUpload/>
        <ChairUpload/>
        <BedUpload/>
        <DressingTableUpload/>
        </>
    )
}