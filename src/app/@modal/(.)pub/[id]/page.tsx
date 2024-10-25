import {Modal} from "./modal"
import FullPageImageView from "~/components/full-image-page";

export default  function PhotoModal({
    params:{id:photoId},
}:{ 
    params:{id:string};
}
){    const idAsNumber= parseInt(photoId)
    if(Number.isNaN(idAsNumber))throw new Error("invalid photo id")
    return <Modal>
           <FullPageImageView id={idAsNumber}/>
    </Modal>
}