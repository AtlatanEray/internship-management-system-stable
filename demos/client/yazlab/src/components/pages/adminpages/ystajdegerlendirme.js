import { useEffect } from 'react';
import { useState } from "react";
import {variables} from '../../../Variables.js';

function Ystajdegerlendirme() {

    const {user, role, id, accessToken, previousLogin} = JSON.parse(localStorage.getItem('user'));

    const [students, setStudent] = useState([]);
    const [pdfBasvuru, setPdfBasvuru] = useState();
    const [pdfDefter, setPdfDefter] = useState();
    const [pdfDeg, setPdfDeg] = useState();
    const [idd, setId] = useState();
    const [studentName, setStudentName] = useState("");
    const [studentTc, setStudentTc] = useState(Date());
    const [baslangic, setBaslangic] = useState(Date());
    const [bitis, setBitis] = useState("");
    const [gun, setGun] = useState();
    const [kabulgun, setKabulGun] = useState(31);
    const [kurum, setKurum] = useState();
    const [passed, setPassed] = useState(false);
//InternshipExams/Mark?internshipId=49&passed=true&acceptedDay=25

    useEffect(
        // Effect from first render
        () => {
            Student();
            console.log(bitis)
        },
        [] // Never re-runs
    );

    function Student() {
        fetch(variables.API_URL + "InternshipExams/ListByTeacherUserId/" + user.id , {
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

    async function Staj() {
        await fetch(variables.API_URL + "InternshipExams/Mark?id="+idd+"&passed="+passed+"&acceptedDay="+kabulgun, {
            headers: {
                'Accept': '*/*'
                },
            method:'PUT'
            });

           await Student();
    }

    
    return(
        <>
        {/* <!-- ogrstajtakip Start --> */}
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                            <div class="col-12">
                                <div class="bg-light rounded h-100 p-4">
                                    <h6 class="mb-4">Öğrenci Listele</h6>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Adı Soyadı</th>
                                                    <th scope="col">Staj ID</th>
                                                    <th scope="col">Staj Başvuru Formu</th>
                                                    <th scope="col">Staj Defteri</th>
                                                    <th scope="col">Staj Değerlendirme Formu</th>
                                                    {/* <th scope="col">Belge Değerlendirme</th> */}
                                                    <th scope="col">Sınav Tarihi</th>
                                                    <th scope="col">Staj</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {students.map(student =>
                                                <tr>
                                                    <th scope="row">{student.internship.studentInternships[0].student.studentNumber}</th>
                                                    <td>{student.internship.studentInternships[0].student.user.firstName+" "+student.internship.studentInternships[0].student.user.lastName}</td>
                                                    <td scope="row">{student.internshipId}</td>
                                                    <td><a data-toggle="modal" data-target="#basvuruModal" onClick={()=>setPdfBasvuru(student.internshipId)}>Görüntüle</a></td>
                                                    <td><a data-toggle="modal" data-target="#defterModal" onClick={()=>setPdfDefter(student.internshipId)}>Görüntüle</a></td>
                                                    <td><a data-toggle="modal" data-target="#degModal" onClick={()=>setPdfDeg(student.internshipId)}>Görüntüle</a></td>
                                                    {/* <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#belgeModal">Değerlendir</button></td> */}
                                                    <td scope="row">{student.examTime.substring(0,10)}</td>
                                                    <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#notModal"  onClick={()=>(setPdfBasvuru(student.internshipId),
                                                        setStudentName(student.internship.studentInternships[0].student.user.firstName+" "+student.internship.studentInternships[0].student.user.lastName),
                                                        setStudentTc(student.internship.studentInternships[0].student.user.tc),
                                                        setBaslangic(student.internship.startingDate),
                                                        setBitis(student.internship.endingDate),
                                                        setKurum(student.internship.company.formalName),
                                                        setGun(student.internship.workDay),
                                                        setId(student.id))}>Notlandır</button></td>               
                    
                                                </tr>)}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
           
            {/* <!-- ogrstajtakip End --> */}

            <div class="modal fade" id="basvuruModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true" >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe  style={{frameborder:"0", marginheight:"0", marginwidth:"0",
                             width:"100%", height:"100%"}} src={"https://localhost:7148/api/Internships/readpdf/"+pdfBasvuru}/> 
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="defterModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Defteri</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe style={{frameborder:"0", marginheight:"0", marginwidth:"0",
                             width:"100%", height:"100%"}} src={"https://localhost:7148/api/Internships/readBookpdf/"+pdfDefter}/> 
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="degModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true" >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Değerlendirme Belgesi</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe style={{frameborder:"0", marginheight:"0", marginwidth:"0",
                             width:"100%", height:"100%"}} src={"https://localhost:7148/api/Internships/readEvulationpdf/"+pdfDeg}/> 
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="notModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Notlandırma</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="adSoyad"
                                        placeholder="adSoyad"
                                    aria-label="default input example" disabled value={studentName}/>
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="tc"
                                        placeholder="tc"
                                    aria-label="default input example" disabled value={studentTc}/>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class ="mb-3">
                                    <label for="form-horizontal">Başlangıç Tarihi</label>
                                    <form class="form-horizontal" role="form">
                                        <input type="text" class="form-control" id="text" disabled value={baslangic.substring(0,10)}/>
                                    </form>
                                </div>                                                                     
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label for="form-horizontal">Bitiş Tarihi</label>
                                    <form class="form-horizontal" role="form">
                                        <input type="text" class="form-control" id="text" disabled value={bitis.substring(0,10)}/>
                                    </form>
                                </div> 
                            </div>
                            <div class="col-lg-4">
                                <div class="form-floating mb-3">
                                    <input type = "text" class="form-control" id="isGunu"
                                            placeholder="isGunu"
                                            aria-label="default input example" disabled value={gun+" gün"}/>
                                </div>
                            </div>              
                        </div>
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="kurumAdi"
                                    placeholder="kurumAdi"
                                    aria-label="default input example" disabled value={kurum}/>
                        </div>
                        <h6>Staj Notlandırma</h6>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                               value={passed}
                               onClick={() => setPassed(true)}/>
                            <label class="form-check-label" for="inlineRadio2" >Başarılı</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                value={passed}
                                onClick={() => setPassed(false)}/>
                            <label class="form-check-label" for="inlineRadio2">Başarısız</label>
                        </div>
                        {/* <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Eksik</label>
                        </div> */}
                        <div class="form-floating mb-3">
                            <input type = "text" class="form-control" id="aciklama"
                                        placeholder="aciklama" onChange={()=>setKabulGun(event.target.value)}
                                    aria-label="default input example"/>
                                    <label for="eksikBelge">Kabul Edilen Gün Sayısı</label>
                        </div>                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={Staj}>Kaydet</button>
                    </div>
                  </div>
                </div>
            </div>

            {/* <div class="modal fade" id="belgeModal" tabindex="-1" role="dialog" aria-labelledby="belgeModalLabel" aria-hidden="true">
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
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} >Kaydet</button>
                    </div>
                  </div>
                </div>
                </div> */}
        </>
    )
}

export default Ystajdegerlendirme;