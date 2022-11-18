import {variables} from '../../../Variables.js';
import { useEffect } from 'react';
import { useState } from "react";

function Sadminatama () {

    const [teachers, setTeachers] = useState([]);
    const [admins, setAdmin] = useState([]);
    const [id, setId] = useState();
    const [comid, setComid] = useState();

    useEffect(
        // Effect from first render
        () => {
           Teacher();
           admin();
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
           console.log("çalışs");
    }

    async function admin() {
        await fetch(variables.API_URL + "Admins/ListAdmins", {
            headers: {
                'Accept': 'application/json'
                }
            })
           .then(response => response.json())
           .then(data => {
            console.log("deneme deneme");
            console.log(data);
               setAdmin(data);
           });

           console.log(admins);
           console.log("çalış");
    }

    async function addadmin() {
            var x = JSON.stringify({
                userId: id
            })
            await fetch(variables.API_URL + "Admins", {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json'
                },
                body: x
            })
            admin();


    }

    async function deladmin() {
        
        await fetch(variables.API_URL + "Admins/DeleteAdminByUserId/"+comid,{
            method: 'DELETE',
            
        } );
        await admin();

    }

    return (
        <>
         <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Yeni admin Üyesi Ekleme as</h6>
                            
                            <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#yenikomisyonModal">admin Üyesi Ekle</button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal fade" id="yenikomisyonModal" tabIndex="-1" role="dialog" aria-labelledby="sifreataModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="sifreataModalLabel">admin Üyesi Ekleme</h5>
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
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}}  onClick={addadmin}>Ekle</button>
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
                                                    <th scope="col">admindan Çıkar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {admins.map(admin =>
                                                <tr>
                                                    <th scope="row">{admin.user.teacher.registrationNumber}</th>                               
                                                    <td><a href="#">{admin.user.firstName}</a></td>
                                                    <td><a href="#">{admin.user.lastName}</a></td>     
                                                    <td><a href="#">{admin.user.telephone}</a></td> 
                                                    <td><a href="#">{admin.user.email}</a></td>                                              
                                                    <td><button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} data-toggle="modal" data-target="#notModal" onClick= { () => setComid(admin.userId)}>X</button></td>
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
                      <h5 class="modal-title" id="notModalLabel">admin Üyesini Çıkarma</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        
                        <p>Bu kişiyi admindan üyelerinden çıkarmak istediğinize emin misiniz?</p>
                        
                        
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" style={{backgroundColor:"#009933"}} onClick={deladmin}>Çıkar</button>
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