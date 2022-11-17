import { useEffect } from 'react';
import { useState } from "react";
import {variables} from '../../../Variables.js';

function Stajtakip () {
    const {user, role, id, accessToken, previousLogin} = JSON.parse(localStorage.getItem('user'));
    const [stajtakip, setStajtakip] = useState();

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
                setStajtakip(data);
            });

        },
        [] // Never re-runs
    );




    return (
        <>

{internship.map(intern => 
            
            ++count%2==0?
            <div className="card" style={{width: "18rem"}}>
            <image className="card-img-top"  alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{intern.internshipType==1?"Staj 1":"Staj 2"}</h5>
                <p className="card-text">{intern.id}</p>
                <a href={variables.API_URL+"Internships/download/"+intern.id} target="_blank" className="btn btn-primary" >İndir</a>
                
            </div>
            {console.log("c: "+count)}
        </div>
        
        : null
            )}
            
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Staj Başvuru Formu Yükleme Alanı</h6>
                                <div class="mb-3">
                                <label for="formFile" class="form-label">Default file input example</label>
                                <input class="form-control" type="file" id="formFile"/>
                                <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}}>Başvuru Yap</button>                              
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-xl-6">
                    <div class="bg-light rounded h-100 p-4">
                        <p class="mb-4" style={{fontSize:25, color: "#000"}}> Öğrenciler Başvurular kısmından staj başvuru formunu doldurup çıktısını almalıdırlar. </p>
                        <p class="mb-4" style={{fontSize:25, color: "#000;"}}>Gerekli belgeleri iş yerine kaşeletip imzalattıktan sonra Staj Başvuru Formu Yükleme Alanına yüklemeleri gerekmektedirler.</p>
                    </div>
                </div>
                <div class="col-sm-12 col-xl-12">
                    <div class="bg-light rounded h-100 p-4">
                        <h6 class="mb-4">Başvuru Takibi</h6>
                        <label for="form-label" class="form-label">Staj başvurusunu başarıyla tamamladınız. Başvuru takibini bu alandan yapabilirsiniz.</label>
                        <br/>
                        {
                        (() => {if(stajtakip===1){                            
                            return(<p style={{fontSize:30, color: "#000"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            Başvurunuz inceleniyor.
                        </p>)
                        } else if (stajtakip===2){
                            
                            return(<p style={{fontSize:30, color: "#000"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                              </svg>
                              Başvurunuz onaylandı.
                        </p>)
                        } else {
                            
                            return(<p style={{fontSize:30, color: "#000"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                              </svg>
                              Başvurunuz reddedildi.
                        </p>)
                        
                    }
                  })()
                  }
                        
                    </div>
                </div>
            </div>
            </div>

            
        </>
    );
};

export default Stajtakip;