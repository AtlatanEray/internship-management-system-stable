import { useEffect } from 'react';
import { useState } from "react";
import {variables} from '../../../Variables.js';

function Komstajsinav () {

    const [students, setStudent] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [id, setId] = useState();
    const [pdfBasvuru, setPdfBasvuru] = useState();
    const [pdfDefter, setPdfDefter] = useState();
    const [pdfDeg, setPdfDeg] = useState();
    const [examTime, setExamTime] = useState(new Date());
    var exam;


    useEffect(
        // Effect from first render
        () => {
           Student();
           Teacher();
        },
        [] // Never re-runs
    );

    function Student() {
        fetch(variables.API_URL + "InternshipDocControls/GetInternshipForExamAssignment", {
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

    function Teacher() {
        fetch(variables.API_URL + "Teachers", {
            headers: {
                'Accept': 'application/json'
                }
            })
           .then(response => response.json())
           .then(data => {
               setTeachers(data);
           });

           console.log(teachers);
           console.log("çalış");
    }

    function postInternshipExam(exam)  {
        var x;
        fetch(variables.API_URL+'InternshipExams/setExamAssignment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
          },
          body: exam
          
        }).then(res => res.json())
        .then(response => {return (response.id);}, error => console.error('Error:', error));
        console.log("intern Id: " + x);
        return x;
      }

      function postExam() {
        var x = JSON.stringify({
            internshipId: pdfBasvuru,
            teacherId: id,
            examTime: '2022-11-17',
        });
        console.log(JSON.parse(x));
        exam = postInternshipExam(x);
    }

    return (
        <>
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
                                                    <th scope="col">Belge Değerlendirme</th>
                                                    <th scope="col">Sınav Bilgileri</th>
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
                                                    <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#belgeModal">Reddet</button></td>
                                                    <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#sinavModal" onClick={()=>setPdfBasvuru(student.internshipId)}>Düzenle</button></td>                    
                    
                                                </tr>)}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>

            <div class="modal fade" id="basvuruModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Başvuru Formu</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe src={"https://localhost:7148/api/Internships/readpdf/"+pdfBasvuru}/> 
                        
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
                        <iframe src={"https://localhost:7148/api/Internships/readBookpdf/"+pdfDefter}/> 
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="degModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Öğrenci Staj Değerlendirme Belgesi</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <iframe src={"https://localhost:7148/api/Internships/readEvulationpdf/"+pdfDeg}/> 
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close" style={{backgroundColor:"#009933"}}>Kapat</button>
                    </div>
                  </div>
                </div>
            </div>
           
            {/* <!-- ogrstajtakip End --> */}
           
{/* ögr staj degerlentdirme
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
                        </div>                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}>Kaydet</button>
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
                            <p>Reddetmek istediğinize emin misiniz?</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}>Reddet</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="modal fade" id="sinavModal" tabindex="-1" role="dialog" aria-labelledby="sinavModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="sinavModalLabel">Sınav Bilgileri</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
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
                        <div class ="mb-3">
                            <label for="form-horizontal">Değerlendirme Tarihi</label>
                            <form class="form-horizontal" role="form">
                                <input type="date" class="form-control" id="date"/>
                            </form>
                        </div>    
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="form-floating mb-3" style={{marginTop:"20px"}}>
                                
                                    <select onChange={() => setId(event.target.value)}
                                     class="form-select" id="floatingSelectRol4"
                                        aria-label="Floating label select example"
                                         >
                                            {teachers.map((teacher) => 
                                                 <option value={teacher.user.id} >{teacher.user.firstName+" "+teacher.user.lastName}</option>
                                             )}
                                        <option selected>Seçiniz</option>
                                    </select>
                                    <label htmlFor="floatingSelectRol4">Öğretmenler</label>
                                </div>
                                                                 
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={postExam}>Kaydet</button>
                    </div>
                  </div>
                </div>
            </div>
        </>
    )
}

export default Komstajsinav;