import {variables} from '../../../Variables.js';
import { useEffect } from 'react';
import { useState } from "react";
import {postCommission, deleteCommission} from '../../hooks/useAddCommission.js';

function Sadminatama () {

    const [teachers, setTeachers] = useState([]);
    const [commissions, setCommission] = useState([]);
    const [id, setId] = useState();
    const [comid, setComid] = useState();

    useEffect(
        // Effect from first render
        () => {
           Teacher();
           Commission();
        },
        [] // Never re-runs
    );
 
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

    function Commission() {
        fetch(variables.API_URL + "Commissions", {
            headers: {
                'Accept': 'application/json'
                }
            })
           .then(response => response.json())
           .then(data => {
               setCommission(data);
           });

           console.log(commissions);
           console.log("çalış");
    }

    async function addCommission() {
 
            var x = JSON.stringify({
                teacherId: id
                   
            });
            console.log(JSON.parse(x));
            await postCommission(x);
            Commission();


    }

    async function delCommission() {
        
        await deleteCommission(comid);
        await Commission();

    }

    return (
        <>
         <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Yeni Komisyon Üyesi Ekleme</h6>
                            
                            <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#yenikomisyonModal">Komisyon Üyesi Ekle</button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal fade" id="yenikomisyonModal" tabIndex="-1" role="dialog" aria-labelledby="sifreataModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="sifreataModalLabel">Komisyon Üyesi Ekleme</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
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
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}  onClick={addCommission}>Ekle</button>
                    </div>
                  </div>
                </div>
            </div>

            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                            <div class="col-12">
                                <div class="bg-light rounded h-100 p-4">
                                    <h6 class="mb-4">Öğrenci Listele</h6>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sicil No</th>
                                                    <th scope="col">Adı </th>
                                                    <th scope="col">Soyadı</th>
                                                    <th scope="col">Telefon Numarası</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Komisyondan Çıkar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commissions.map(commission =>
                                                <tr>
                                                    <th scope="row">{commission.teacher.registrationNumber}</th>                               
                                                    <td><a href="#">{commission.teacher.user.firstName}</a></td>
                                                    <td><a href="#">{commission.teacher.user.lastName}</a></td>     
                                                    <td><a href="#">{commission.teacher.user.telephone}</a></td> 
                                                    <td><a href="#">{commission.teacher.user.email}</a></td>                                              
                                                    <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#notModal" onClick= { () => setComid(commission.teacher.user.id)}>X</button></td>
                                                </tr>)}
                                                
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                </div>
                            </div>
                </div>
            </div>

            {/* <!-- ogrstajtakip End --> */}

            <div class="modal fade" id="notModal" tabindex="-1" role="dialog" aria-labelledby="notModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="notModalLabel">Komisyon Üyesini Çıkarma</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        
                        <p>Bu kişiyi komisyondan üyelerinden çıkarmak istediğinize emin misiniz?</p>
                        
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={delCommission}>Çıkar</button>
                    </div>
                  </div>
                </div>
            </div>

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
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933", marginRight:"10px", marginLeft:"10px"}}>Kaydet</button>
                    </div>
                  </div>
                </div>
            </div>
        
        </>
    )
}

export default Sadminatama;