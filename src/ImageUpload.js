import React,{useState} from 'react'
import './ImageUpload.css'
import {Button} from 'react-bootstrap';
import { db,storage } from './Firebase';
import * as firebase from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from '@material-ui/core';

function ImageUpload({userName,handleCloseModal}) {
    // console.log('userName',userName);
    const[imageCaption,setImageCaption]=useState('')
    const [progress,setProgess]=useState(0)
    const[imageSelected,setImageSelected]=useState('')

    const handleUpload=(e)=>{
        e.preventDefault();

        const uploadTask=storage.ref(`images/${imageSelected.name}`).put(imageSelected)

        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function
                const progress =Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgess(progress);
            },
            (error)=>{
                //Error function
                console.log(error)
                alert(error.message);
            },
            ()=>{
                //complete function
                storage
                    .ref("images")
                    .child(imageSelected.name)
                    .getDownloadURL()
                    .then(url=>{
                        //posting image inside the db
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            imageCaption:imageCaption,
                            imageUrl:url,
                            userName:userName
                        });
                        setProgess(0);
                        setImageCaption("")
                        setImageSelected(null)
                        handleCloseModal()
                    })
            }
        )
    }
    
    const onSelectingImage=(e)=>{
        e.preventDefault();
        if(e.target.files[0]){
            setImageSelected(e.target.files[0])
        }

    }
    return (
        <React.Fragment>
            <div className="image__upload">
                <Input
                    type="file"
                    className="select__image"
                    onChange={(e)=>onSelectingImage(e)}
                />
                {(progress!==0)?<progress value={progress} className="progress__bar" max="100" />:''}
                <input
                    className="img__caption"
                    type="text"
                    name="imageCaption"
                    placeholder="Enter a caption"
                    value={imageCaption}
                    onChange={(e)=>setImageCaption(e.target.value)}
                />
                <Button type="button" className="upload__btn" onClick={(event)=>{handleUpload(event)}}>Upload</Button>    
            </div>
                    
        </React.Fragment>
    )
}

export default ImageUpload
