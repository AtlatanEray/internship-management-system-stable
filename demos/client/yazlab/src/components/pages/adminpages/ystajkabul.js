import { useState } from "react";
import { useEffect } from 'react';
import {variables} from '../../../Variables.js';

function Ystajkabul () {

    const [students, setStudent] = useState([]);
    const [pdf, setPdf] = useState();
    const [stajId, setStajId] = useState();

    useEffect(
        // Effect from first render
        () => {
           Student();
        },
        [] // Never re-runs
    );

    function Student() {
        fetch(variables.API_URL + "InternshipControlInfoes/pendinginternships", {
            headers: {
                'Accept': 'application/json'
                }
            })
           .then(response => response.json())
           .then(data => {
               setStudent(data);
           });

           console.log(students);
           console.log("çalış");
    }

    async function StajApprove( approve) {
        await fetch(variables.API_URL + "InternshipControlInfoes/approveapplication?internshipId="+stajId+"&approve="+(approve?"true":"false"), {
            headers: {
                'Accept': '*/*'
                },
            method:'PUT'
            });

           await Student();
    }

    return (
        <>
         <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                            <div class="col-12">
                                <div class="bg-light rounded h-100 p-4">
                                    <h6 class="mb-4">Staj Kabul</h6>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Staj ID</th>
                                                    <th scope="col">Adı Soyadı</th>
                                                    <th scope="col">Staj Başvuru Formu</th>
                                                    <th scope="col">Kabul</th>
                                                    <th scope="col">Ret</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {students.map(student =>
                                                <tr>
                                                    <th scope="row">{student.internship.studentInternships[0].student.studentNumber}</th>
                                                    <td scope="row">{student.internshipId}</td>
                                                    {/* <td>
                                                        <button type="button" class="btn mr-1" data-toggle="modal" data-target="#silModal">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                              </svg>
                                                        </button>
                                                    </td> */}
                                                    <td>{student.internship.studentInternships[0].student.user.firstName+" "+student.internship.studentInternships[0].student.user.lastName}</td>
                                                    <td><a data-toggle="modal" data-target="#notModal" onClick={()=>setPdf(student.internshipId)}>Görüntüle</a></td>
                                                    <td>
                                                        <button type="button" class="btn mr-1" data-toggle="modal" data-target="#kabulModal" onClick={()=>setStajId(student.internshipId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-check-circle" viewBox="0 0 16 16" >
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                                            </svg>
                                                        </button>
                                                    </td> 
                                                    <td>
                                                        <button type="button" class="btn mr-1" data-toggle="modal" data-target="#retModal" onClick={()=>setStajId(student.internshipId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                              </svg>
                                                        </button>
                                                    </td>
                                                    
                                                </tr>)}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>

            <div class="modal fade" id="notModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe style={{frameborder:"0", marginheight:"0", marginwidth:"0",
                             width:"100%", height:"100%"}} src={"https://localhost:7148/api/Internships/readpdf/"+pdf}/> 
                        {/* <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="adSoyad"
                                        placeholder="adSoyad"
                                    aria-label="default input example" disabled/>
                                    <label for="adSoyad">Ad Soyad</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="tc"
                                        placeholder="tc"
                                    aria-label="default input example" disabled/>
                                    <label for="tc">TC</label>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class ="mb-3">
                                    <label for="form-horizontal">Başlangıç Tarihi</label>
                                    <form class="form-horizontal" role="form">
                                        <input type="date" class="form-control" id="date" disabled/>
                                    </form>
                                </div>                                                                     
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label for="form-horizontal">Bitiş Tarihi</label>
                                    <form class="form-horizontal" role="form">
                                        <input type="date" class="form-control" id="date" disabled/>
                                    </form>
                                </div> 
                            </div>
                            <div class="col-lg-4">
                                <div class="form-floating mb-3">
                                    <input type = "text" class="form-control" id="isGunu"
                                            placeholder="isGunu"
                                            aria-label="default input example" disabled/>
                                            <label for="ısGunu">İş Günü Sayısı</label>
                                </div>
                            </div>              
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="kurumAdi"
                                    placeholder="kurumAdi"
                                    aria-label="default input example" disabled/>
                                    <label for="kurumAdi">Kurum Adı</label>
                        </div>
                        <h6>Staj Notlandırma</h6>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value="option2"/>
                            <label class="form-check-label" for="inlineRadio2">Başarılı</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value="option2"/>
                            <label class="form-check-label" for="inlineRadio2">Başarısız</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Eksik</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="aciklama"
                                        placeholder="aciklama"
                                    aria-label="default input example"/>
                                    <label for="eksikBelge">Kabul Edilen Gün Sayısı</label>
                        </div>                         */}
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="kabulModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <p>Bu öğrencinin stajını kabul etmek istediğinizden emin misiniz?</p>
                       
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={()=>StajApprove(true)}>Kabul</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="retModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <p>Bu öğrencinin stajını reddetmek istediğinizden emin misiniz?</p> 
                       
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={()=>StajApprove(false)} >Reddet</button>
                    </div>
                  </div>
                </div>
            </div>

            {/* <div class="modal fade" id="silModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <p>Silmek istediğinizden emin misiniz?</p>                      
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div> */}

            <div class="modal fade" id="belgeModal" tabindex="-1" role="dialog" aria-labelledby="belgeModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="belgeModalLabel">Belge Değerlendirme</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Eksik belge bulunmaktadır.</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="aciklama"
                                        placeholder="aciklama"
                                    aria-label="default input example"/>
                                    <label for="eksikBelge">Açıklama</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value="option2"/>
                            <label class="form-check-label" for="inlineRadio2">Eksik belge bulunmamaktadır.</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}>Kaydet</button>
                    </div>
                  </div>
                </div>
            </div>

        </>
    )
}

export default Ystajkabul;