import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

    return (
        <div className={'ma4 mt0 pt0'}>
           <p className={'f3'}>{'This magic brain will detect faces in your pictures. Give it a try'}</p>
            <div className={'w-80 center'}>
            <div className={'form center pa4 br2 shadow-3'}>
                <input className={'f5 pa2 w-70 center'} type={'text'} onChange={onInputChange} />
                <button className={'w-30 grow f5 link  pv2 br2 dib white bg-light-purple'} onClick={onButtonSubmit}>Detect</button>
            </div>
            </div>
        </div>
    )

}

export default ImageLinkForm;