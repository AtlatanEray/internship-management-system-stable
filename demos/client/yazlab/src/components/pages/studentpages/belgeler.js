import { useState } from "react";
// import { useCreateStaj } from "../hooks/useCreateStaj";
import {variables} from '../../../Variables.js';
import { useEffect } from 'react';
// import {postInternshipAcceptanceForm} from '../hooks/useCreateStaj.js';
// import { json, useResolvedPath } from "react-router-dom";

function Belgeler() {

    const {user, role, id, accessToken, previousLogin} = JSON.parse(localStorage.getItem('user'));
    const [internship, setInternship] = useState([]);
    const [internshipInfo, setInternshipInfo] = useState([]);
    //const [count, setCount] = useState(0);
    const [data, setData] = useState("")
    const [evulationFile, setEvulationFile] = useState("");
    const [bookFile, setBookFile] = useState("");

    var count = 0;

    useEffect(
        // Effect from first render
        () => {
            fetch(variables.API_URL + "internships/getInternshipsByUserId/"+user.id, {
             headers: {
                 'Accept': 'application/json'
                 }
             })
            .then(response => response.json())
            .then(data => {
                console.log(data);       
                setInternship(data);
            });

        },
        [] // Never re-runs
    );

        // function zattirizortzort(id) {
        //     fetch(variables.API_URL+"internships/download/"+id, {
        //         headers: {
        //             'Accept': 'application/pdf'
        //             }
        //     });
        // }

    async function onChangeHandler (e) {
        const data = new FormData();
        await data.append('pdf', e.target.files[0]);
        setData(e.target.files[0]);
    }

    async function onChangeHandlerEvulationForm (e) {
        const data = new FormData();
        await data.append('evulationForm', e.target.files[0]);
        setEvulationFile(e.target.files[0]);
    }

    async function onChangeHandlerBookForm (e) {
        const data = new FormData();
        await data.append('bookForm', e.target.files[0]);
        setBookFile(e.target.files[0]);
    }
    

    async function sendPdf (internId) {
        await fetch(variables.API_URL + "Internships/uploadAcceptanceForm?internId="+internId,{
            method: 'POST',
            body: data
        });

    }

    async function sendAfterInternshipPdf (internId) {
        
        const data = new FormData();
        await data.append('evulationForm', evulationFile);
        await data.append('bookForm', bookFile);
        await fetch(variables.API_URL + "Internships/UploadAfterInternshipDoc?internId="+internId,{
            
            method: 'POST',
            body: data
        });

    }
    
    return (
        <>
        {internship.map(intern => 
            
            <div className="card" style={{width: "18rem"}}>
            <image className="card-img-top"  alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{intern.internshipType==1?"Staj 1":"Staj 2"}</h5>
                <h4>{intern.internshipControlInfos.length>0?intern.internshipControlInfos[0].infoMessage:"NO INFO"}</h4>
                <p className="card-text">Staj Id: {intern.id}</p>
                {intern.internshipControlInfos.length>0&&intern.internshipControlInfos[0].infoMessage=="ApplicationApproved" ?
                <>
                <div class="bg-light rounded h-100 p-4">
                    <h6 class="mb-4">Staj Sonrası PDF Yükleme Alanı</h6>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Staj Kabul Formu:</label>
                        <input class="form-control" type="file" name="fileEvulation" id="formFileEvulation" onChange={onChangeHandlerEvulationForm}/>
                        <label for="formFile" class="form-label">Staj Defteri PDF:</label>
                        <input class="form-control" type="file" name="fileBook" id="formFileBook" onChange={onChangeHandlerBookForm}/>
                        <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}} onClick={() => sendAfterInternshipPdf(intern.id)}>Başvuru Yap</button>                              
                    </div>
                </div>
                </>
                :

                <>
                <a href={variables.API_URL+"Internships/download/"+intern.id} target="_blank" className="btn btn-primary" >İndir</a>
                <div class="bg-light rounded h-100 p-4">
                    <h6 class="mb-4">Staj Başvuru Formu Yükleme Alanı</h6>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Default file input example</label>
                        <input class="form-control" type="file" name="file" id="formFile" onChange={onChangeHandler}/>
                        <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}} onClick={() => sendPdf(intern.id)}>Başvuru Yap</button>                              
                    </div>
                </div></>}
            </div>
            {console.log("c: "+count)}
        </div>
        
            )}
            
         </>
    )
}

export default Belgeler;