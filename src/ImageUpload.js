import React,{useState} from 'react'
import './ImageUpload.css'
import Button from '@material-ui/core/Button';
import { db,storage } from './Firebase';
import * as firebase from 'firebase/app';

function ImageUpload({userName}) {
    console.log('userName',userName);
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
            <input
                type="text"
                name="imageCaption"
                placeholder="Enter a caption"
                value={imageCaption}
                onChange={(e)=>setImageCaption(e.target.value)}
            />
            <progress value={progress} max="100" />
            <input
                type="file"
                onChange={(e)=>onSelectingImage(e)}
            />
            <Button type="button" onClick={(event)=>{handleUpload(event)}}>Upload</Button>            
        </React.Fragment>
    )
}

export default ImageUpload
