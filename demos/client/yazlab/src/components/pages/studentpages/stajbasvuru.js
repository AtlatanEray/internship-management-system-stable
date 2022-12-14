import { useState } from "react";
// import { useCreateStaj } from "../hooks/useCreateStaj";
import {variables} from '../../../Variables.js';
import { useEffect } from 'react';
import {postInternshipAcceptanceForm} from '../../hooks/useCreateStaj.js';
// import { json } from "react-router-dom";

function Stajbasvuru() {

    const {user, role, id, accessToken, previousLogin} = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    // const {intern, error, emptyFields} = useCreateStaj();
    //const {intern} = useCreateStaj();

    const [workDay, setWorkDay] = useState(); //will be posteed to backend
    const [internshipType, setInternshipType] = useState(1); //will be posteed to backend
    const [sgk, setSgk] = useState(true); //will be posteed to backend
    const [age, setAge] = useState(true); //will be posteed to backend 
    const [gss, setGss] = useState(true); //will be posteed to backend
    // const [manager, setManager] = useState();
    // const [districtId, setDistrictId] = useState(true);
    const [companyAddressInfo, setCompanyAddressInfo] = useState(""); //will be posteed to backend
    const [formalName, setFormalName] = useState(""); //will be posteed to backend
    const [telephone, setTelephone] = useState(""); //will be posteed to backend
    const [fax, setFax] = useState(""); //will be posteed to backend
    const [email, setEmail] = useState(""); //will be posteed to backend
    const [field, setField] = useState(); //will be posteed to backend
    const [studentAddressInfo, setStudentAddressInfo] = useState("");
    const [startingDate, setStartingDate] = useState(""); //will be posteed to backend
    const [endingDate, setEndingDate] = useState(""); //will be posteed to backend 
    const [stateContribution, setStateContribution] = useState(true); //will be posteed to backend
    var internIdDownload;
    function postForm() {
        var x = JSON.stringify({
            startingDate: startingDate,
            endingDate: endingDate,
            workDay: workDay,
            internshipType: internshipType,
            sgk: sgk,
            _25age: age,
            gss: gss,
            stateContribution: stateContribution,
            autumnPeriod: true,
            manager: managerType,
            address:{
                districtId: studentPostalCode,
                addressInfo: studentAddressInfo
            },
            company: {
                formalName: formalName,
                telephone: telephone,
                fax: fax,
                email: email,
                
                address: {
                    districtId: companyPostalCode,
                    addressInfo: companyAddressInfo
                },
                companyFields: [{
                    fieldId: field
                }]
            },
            studentInternships: [{
                studentId : user.id
            }]
        
        });
        console.log(JSON.parse(x));
        internIdDownload = postInternshipAcceptanceForm(x);
    }

    function downloadPDF() {
        fetch(variables.API_URL+'internships/download/'+internIdDownload, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        })
    }
  
    const [cities, setCities] = useState([]);
    const [studentDistricts, setStudentDistricts] = useState([]);
    const [studentPostalCode, setStudentPostalCode] = useState(0); //will be posted to backend
    const [companyDistricts, setCompanyDistricts] = useState([]);
    const [companyPostalCode, setCompanyPostalCode] = useState(0); //will be posted to backend
    
    const [fields , setFields] = useState([]);
    const [managerTypes , setManagerTypes] = useState([]);
    const [managerType, setManagerType] = useState(); //will be posted to backend

        useEffect(
            // Effect from first render
            () => {
                fetch(variables.API_URL + "Cities", {
                 headers: {
                     'Accept': 'application/json'
                     }
                 })
                .then(response => response.json())
                .then(data => {
                    setCities(data);
                });

                fetch(variables.API_URL + "FieldOfActivities", {
                    headers: {
                        'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        setFields(data);
                });

                fetch(variables.API_URL + "ManagerTypes", {
                    headers: {
                        'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        setManagerTypes(data)
                });

                console.log(cities);
                console.log("??al????");
            },
            [] // Never re-runs
        );

        function handleStudentCityChange(id) {
            fetch(variables.API_URL + "Districts/fromcityid/" + id, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setStudentDistricts(data);
            });
        }

        function handleCompanyCityChange(id) {
            fetch(variables.API_URL + "Districts/fromcityid/" + id, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setCompanyDistricts(data);
            });
        }

        // changeStudentAddressInfo =(e)=>{
        //     setStudentAddressInfo(e.target.value);
        // }

    
    return (
        <>
         <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Ki??isel Bilgiler</h6>
                            <div class="row">
                                <div class="col-xl-6">
                                <div class="form-floating mb-3">
                                    <input type = "text" class="form-control" id="adSoyad"
                                                placeholder="adSoyad"  value={user.firstName + " " + user.lastName}
                                            aria-label="default input example" disabled/>
                                            <label for="adSoyad">Ad Soyad</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type = "text" class="form-control" id="tc"
                                                placeholder="tc" value={user.tc}
                                            aria-label="default input example" disabled/>
                                            <label for="tc">TC</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type = "text" class="form-control" id="telNo"
                                                placeholder="telNo" value={user.telephone}
                                            aria-label="default input example" disabled/>
                                            <label for="telNo">Telefon Numaras??</label>
                                </div>                              
                            </div>
                            <div class="col-xl-6">
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput"
                                        placeholder="name@example.com" value={user.email} disabled/>
                                    <label for="floatingInput">E-Mail</label>
                                </div>
                                        <div class = "row">
                                            <div class="col-lg-4">
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" id="floatingSelectIl"
                                                        onChange={() => handleStudentCityChange(event.target.value)}
                                                        aria-label="Floating label select example">
                                                        <option selected>Se??iniz</option>
                                                        {cities.map(city => 
                                                            <option value={city.id}>{city.name}</option>
                                                        )}
                                                    </select>
                                                    <label for="floatingSelectIl">??l</label>
                                                </div>
                                            </div>
                                        <div class="col-lg-4">
                                            <div class="form-floating mb-3">
                                                <select class="form-select" id="floatingSelectIlce"
                                                    onChange={() => setStudentPostalCode(event.target.value)}
                                                    aria-label="Floating label select example">
                                                    <option selected>Se??iniz</option> 
                                                    {studentDistricts.map(district => 
                                                        <option value={district.id}>{district.name}</option>
                                                    )}
                                                </select>
                                                <label for="floatingSelectIlce">??l??e</label>
                                            </div>
                                        </div> 
                                        <div class="col-lg-4">
                                            <div class="form-floating mb-3">
                                                <input type="email" class="form-control" id="floatingInput"
                                                    placeholder="name@example.com" disabled/>
                                                <label for="floatingInput">{studentPostalCode==0 ? "Posta Kodu" : studentPostalCode}</label>
                                            </div>
                                        </div>                           
                                    </div>  
                                    <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here"
                                    id="floatingTextarea" style={{width: "100%"}}
                                    value={studentAddressInfo}
                                    onChange={() => console.log(setStudentAddressInfo(event.target.value))} ></textarea>
                                <label for="floatingTextarea">Adres A????klamas??</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Staj Bilgileri</h6>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class ="mb-3">
                                        <label for="form-horizontal">Ba??lang???? Tarihi</label>
                                        <form class="form-horizontal" role="form">
                                            <input type="date" class="form-control" id="date"
                                            onChange={() => setStartingDate(event.target.value)}
                                            />
                                        </form>
                                    </div>                                                                     
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="form-horizontal">Biti?? Tarihi</label>
                                        <form class="form-horizontal" role="form">
                                            <input type="date" class="form-control" id="date"
                                            onChange={() => setEndingDate(event.target.value)}
                                            />
                                        </form>
                                    </div> 
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-floating mb-3">
                                        <input type = "text" class="form-control" id="isGunu"
                                                    placeholder="isGunu" value={workDay}
                                                    onChange={(e) => setWorkDay(e.target.value)}
                                                aria-label="default input example"/>
                                                <label for="??sGunu">???? G??n?? Say??s??</label>
                                    </div>
                                </div>              
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-floating mb-3">
                                        <h6>L??tfen staj yapmak d??neminizi se??iniz:</h6>
                                        <fieldset class="row mb-3" id="group1">
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios1" value={internshipType}
                                                        onClick={() => setInternshipType(1)} checked/>
                                                    <label class="form-check-label" htmlFor="gridRadios1">
                                                        Staj 1
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios2" value={internshipType}
                                                        onClick={() => setInternshipType(2)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios2">
                                                        Staj 2
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-floating mb-3">
                                        <h6>Ailemden, kendimden veya anne-baba ??zerinden genel sa??l??k sigortas?? kapsam??nda sa??l??k hizmeti al??yorum:</h6>
                                        <fieldset class="row mb-3" id="group3">         
                                            <div class="col-sm-10 " >
                                                <div class="form-check" >
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios3" checked value={sgk}
                                                        onClick={() => setSgk(true)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios3">
                                                        Evet
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios4" value={sgk}
                                                    
                                                        onClick={() => setSgk(false)}
                                                        />
                                                    <label class="form-check-label" htmlFor="gridRadios4">
                                                       
                                                        Hay??r
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>        
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-floating mb-3">
                                        <h6>Genel sa??l??k sigortas?? (GSS) (Gelir Testi Yapt??rd??m pirim ??d??yorum):</h6>
                                        <fieldset class="row mb-3" id="group4">
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios5" checked
                                                        value={gss}
                                                        onClick={() => setGss(true)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios5">
                                                        Evet
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios6" value={gss}
                                                        onClick={() => setGss(false)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios6">
                                                       Hay??r
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-floating mb-3">
                                        <h6>25 ya????m?? doldurdum:</h6>
                                        <fieldset class="row mb-3" id="group5">
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios7" checked
                                                        value={age}
                                                        onClick={() => setAge(true)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios7">
                                                       Evet
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        id="gridRadios8" 
                                                        value={age}
                                                        onClick={() => setAge(false)}/>
                                                    <label class="form-check-label" htmlFor="gridRadios8">
                                                        Hay??r
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>                                                                                                                                                                                
                        </div>
                    </div>

                    <div class="container-fluid pt-4 px-4">
                        <div class="row g-4">
                            <div class="col-sm-12 col-xl-12">
                                <div class="bg-light rounded h-100 p-4">
                                    <h6 class="mb-4">Staj Yap??lacak Kurum Bilgileri</h6>
                                    <div class="row">
                                        <div class="col-xl-6">                                     
                                        <div class="form-floating mb-3">
                                            <select class="form-select" id="floatingSelectIl"
                                                onChange={() => setField(event.target.value)}
                                                aria-label="Floating label select example">
                                                <option selected>Se??iniz</option>
                                                {fields.map((field) => 
                                                    <option value={field.id}>{field.name}</option>
                                                )}
                                            </select>                                           
                                            <label for="floatingSelectIl">Faaliyet Alan??</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com"
                                                value={email}
                                                    onChange={(e) => setEmail(e.target.value)}/>
                                            <label for="floatingInput">E-Mail</label>
                                            
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type = "text" class="form-control" id="telNo"
                                                        placeholder="telNo"
                                                    aria-label="default input example"
                                                    value={telephone}
                                                    onChange={(e) => setTelephone(e.target.value)}/>
                                                    <label for="telNo">Telefon Numaras??</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type = "text" class="form-control" id="faxNo"
                                                        placeholder="faxNo"
                                                    aria-label="default input example"
                                                    value={fax}
                                                    onChange={(e) => setFax(e.target.value)}/>
                                                    <label for="faxNo">Fax Numaras??</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="form-floating mb-3">
                                            <input type = "text" class="form-control" id="kurumAdi"
                                                    onChange={() => setFormalName(event.target.value)}
                                                        placeholder="kurumAdi"
                                                    aria-label="default input example"/>
                                                    <label for="kurumAdi">Kurum Ad??</label>
                                        </div>
                                                <div class = "row">
                                                    <div class="col-lg-4">
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select" id="floatingSelectIl"
                                                                onChange={() => handleCompanyCityChange(event.target.value)}
                                                                aria-label="Floating label select example">
                                                                <option selected>Se??iniz</option>
                                                                {cities.map((city) => 
                                                                    <option value={city.id}>{city.name}</option>
                                                                )}
                                                            </select>
                                                            <label for="floatingSelectIl">??l</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4">
                                                    <div class="form-floating mb-3">
                                                        <select class="form-select" id="floatingSelectIlce"
                                                            onChange={() => setCompanyPostalCode(event.target.value)}
                                                            aria-label="Floating label select example">
                                                            <option selected>Se??iniz</option>
                                                            {companyDistricts.map((district) => 
                                                                <option value={district.id}>{district.name}</option>
                                                            )}
                                                        </select>
                                                        <label for="floatingSelectIlce">??l??e</label>
                                                    </div>
                                                </div> 
                                                    <div class="col-lg-4">
                                                        <div class="form-floating mb-3">
                                                            <input type="email" class="form-control" id="floatingInput"
                                                                placeholder="name@example.com" disabled/>
                                                            <label for="floatingInput">
                                                            {companyPostalCode==0 ? "Posta Kodu" : companyPostalCode}
                                                            </label>
                                                        </div>
                                                </div>                                                                                   
                                            </div> 
                                            <div class="form-floating mb-3">
                                                <textarea class="form-control" placeholder="Leave a comment here"
                                                    id="floatingTextarea" style={{width: "100%"}} 
                                                    value={companyAddressInfo}
                                                    onChange={() => console.log(setCompanyAddressInfo(event.target.value))}></textarea>
                                                <label for="floatingTextarea">Adres A????klamas??</label>
                                            </div>  
                                            <div class="form-floating mb-3">
                                                <select class="form-select" id="floatingSelectSorumlu"
                                                onChange={() => setManagerType(event.target.value)}
                                                aria-label="Floating label select example">
                                                <option selected>Se??iniz</option>
                                                {managerTypes.map((manager) => 
                                                    <option value={manager.id}>{manager.type}</option>
                                                )}
                                                </select>
                                                <label for="floatingSelectSorumlu">Staj Sorumlusu</label>
                                            </div>                         
                                        </div>  
                                            
                                    </div>
                                    <div class="form-floating mb-3">
                                        <h6>Kurum olarak 3308 say??l?? kanundaki devlet katk??s??ndan yararlanmak istiyor musunuz?</h6>
                                        <fieldset class="row mb-3">
                                            <div class="col-sm-10">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        value = {stateContribution}
                                                        onClick={() => setStateContribution(true)}
                                                        id="gridRadios1" checked/>
                                                    <label class="form-check-label" for="gridRadios1">
                                                        Evet
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="gridRadios"
                                                        value = {stateContribution}
                                                        onClick={() => setStateContribution(false)}
                                                        id="gridRadios2"/>
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Hay??r
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                                                           
                                </div> 
                                    
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
                    <br/>
                    <div class="m-n2" style={{position: "absolute", right: 5}}>
                        <button type="button" class="btn btn-success rounded-pill m-2 float-right" style={{backgroundColor:"#009933"}} onClick={() => postForm()}>Kaydet</button>
                        
                    </div>
                    {/* {error && <div className="error">{error}</div>} */}
                    
         </>
    )
}

export default Stajbasvuru;