import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Popup({ popupVisible, setPopupVisible }) {
    const [ formStep, setFormStep ] = useState('form')
    const [ formData, setFormData ] = useState({
        "question1": "",
        "question2": "",
        "question3": "",
        "question4": "",
        "question5": "",
        "firstName": "",
        "lastName": "",
        "email" : ""
    })

    const closePopup = () => {
        setPopupVisible(false)
    }

    const handleStepTwoSubmit = () => {
        const formEle = document.querySelector("form")
        const formDatab = new FormData(formEle)
        fetch(
            "https://script.google.com/macros/s/AKfycbwNSvmTcQi_feU0l6TNSUrI82D-9mwOJvquNx-ko32Rk4dfFiSOg9WaAVbZa-fHCtyxBQ/exec",
            {
              method: "POST",
              body: formDatab,
            }
        )
        .then((res) => res.text())
        .then((data) => {
            console.log(data)
            setFormStep('confirmation')

        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (<>
        <div className="scrollbar-hide w-[95%] md:max-w-[500px] lg:max-w-[850px] m-4 px-4 rounded-[30px] overflow-scroll  bg-[#EFDADD] items-center justify-center flex flex-col">
            <div className="py-4 pr-2 w-full flex items-end justify-end">
                <FontAwesomeIcon 
                    className="hover:cursor-pointer text-[#272635]"
                    icon={ faX } 
                    onClick={ closePopup } 
                />
            </div>
            <div className="w-full px-8">
                { formStep === "form" 
                    &&
                    <form className="form">   
                        <div className="flex gap-4">
                            <div className="pb-4 w-full">
                                <p className="text-[#272635] text-md pb-2">
                                    First Name
                                </p>
                                <input
                                    name="firstName"
                                    className="w-[100%] p-2 rounded-[7.5px]"
                                    value={ formData.firstName } 
                                    onChange={ (e) => { 
                                        setFormData({ ...formData, firstName: e.target.value })
                                    } }
                                />
                            </div>
                            {/* Last Name */}
                            <div className="pb-4 w-full">
                                <p className="text-[#272635] text-md pb-2">
                                    Last Name
                                </p>
                                <input
                                    name="lastName"
                                    className="w-[100%] p-2 rounded-[7.5px]"
                                    value={ formData.lastName } 
                                    onChange={ (e) => { 
                                        setFormData({ ...formData, lastName: e.target.value })
                                    } }
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                Email
                            </p>
                            <input
                                name="email"
                                type="email"
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.email } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, email: e.target.value })
                                } }
                            />
                        </div>
                        {/* Question 1 */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                What is a moment you were convinced you weren’t enough?
                            </p>
                            <textarea
                                name="questionOne"
                                rows={ 2 }
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question1 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question1: e.target.value })
                                } }
                            />
                        </div>
                        {/* Question 2 */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                What is a moment you felt like you could do anything?
                            </p>
                            <textarea
                                name="question2"
                                rows={ 2 }
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question2 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question2: e.target.value })
                                } }
                            />
                        </div>
                        {/* Question 3 */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                What is one thing you love about yourself in your strongest moment?
                            </p>
                            <textarea
                                name="question3"
                                rows={ 2 }
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question3 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question3: e.target.value })
                                } }
                            />
                        </div>
                        {/* Question 4 */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                How do you want to evolve or see change in the next year?
                            </p>
                            <textarea
                                name="question4"
                                rows={ 2 }
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question4 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question4: e.target.value })
                                } }
                            />
                        </div>
                        {/* Question 5 */}
                        <div className="pb-4">
                            <p className="text-[#272635] text-md pb-2">
                                Write a positive letter to yourself that you can read a year from now:
                            </p>
                            <textarea
                                name="question5"
                                rows={ 2 } 
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question5 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question5: e.target.value })
                                } }
                            />
                        </div>
                    </form>
                }
                { formStep === "confirmation" 
                    &&
                    <div className="min-h-[250px] flex items-center justify-center flex-col mb-4">
                        <h3 className="text-2xl mb-4">
                            Thank you! 
                        </h3>
                        <p>
                            We'll see you in a year!
                        </p>
                    </div>
                }
            </div>
            {
                formStep === "form"
                    &&
                    <div 
                        className="hover:cursor-pointer hover:scale-110 transition-all duration-[0.5s] rounded-[50px] bg-[#272635] text-[#EFDADD] p-4 min-w-[200px] text-center mb-4"
                        onClick={ handleStepTwoSubmit }
                    >
                        Submit
                    </div>
            }
            {
                formStep === "confirmation"
                &&
                <div 
                    className="hover:cursor-pointer hover:scale-110 transition-all duration-[0.5s] rounded-[50px] bg-[#272635] text-[#EFDADD] p-4 min-w-[200px] text-center mb-4"
                    onClick={ closePopup }
                >
                    Close
                </div>
            }
        </div>
    </>)
}