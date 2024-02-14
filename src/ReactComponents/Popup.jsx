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
        "email" : "",
        "consent": false
    })
    const [ error, setError ] = useState(false)
    const [ errorText, setErrorText ] = useState("")

    const closePopup = () => {
        setPopupVisible(false)
    }

    const handleStepTwoSubmit = () => {
        const formEle = document.querySelector("form")
        const formDatab = new FormData(formEle)
        console.log(formDatab)
        console.log(formData)
        if (!formData.email || !formData.firstName || !formData.lastName || !formData.question1 || !formData.question2 || !formData.question3 || !formData.question4 || !formData.question5) {
            setError(true)
            setErrorText("Please make sure you've filled out the whole form!")
        } else {
            setFormStep('loading')
            fetch(
                 "https://script.google.com/macros/s/AKfycbynQNGnZmLSIzMCbETo9Y6dvdeL8SfvpelaAKMzOzJz943x6bjz5yf4QZ5j_hZOYGIakA/exec",
                {
                  method: "POST",
                  body: formDatab,
                }
            )
            .then((res) => res.text())
            .then((data) => {
                setFormStep('confirmation')
    
            })
            .catch((error) => {
                console.log(error)            
                setError(true)
                setErrorText("Something went wrong when sending your letter, please try again.")
            })
        }
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
            <div className="w-full md:px-8">
                { formStep === "form" 
                    &&
                    <>
                    <div className="text-[#272635] mb-8">
                        <p>
                        Writing and music have always been crutches to helping me overcome obstacles, 
                        help define clarity and celebrate my growth in becoming who I am. 
                        Writing “Darlin’” was a true moment of reflection, and now I want to see how 
                        it helps you heal in love. 
                        <br /><br />
                        Fill out the below and I’ll send you this back a year from now so you can see just how far you’ve come.
                        </p>
                    </div>
                    <form className="form">   
                        <div className="flex gap-4">
                            <div className="pb-4 w-full">
                                <p className="text-[#272635] text-sm md:text-md pb-2">
                                    First Name
                                </p>
                                <input
                                    required
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
                                <p className="text-[#272635] text-sm md:text-md pb-2">
                                    Last Name
                                </p>
                                <input
                                    required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                Email
                            </p>
                            <input
                                required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                What is a moment you were convinced you weren’t enough?
                            </p>
                            <textarea
                                required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                What is a moment you felt like you could do anything?
                            </p>
                            <textarea
                                required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                What is one thing you love about yourself in your strongest moment?
                            </p>
                            <textarea
                                required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                How do you want to evolve or see change in the next year?
                            </p>
                            <textarea
                                required
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
                            <p className="text-[#272635] text-sm md:text-md pb-2">
                                Write a positive letter to yourself that you can read a year from now:
                            </p>
                            <textarea
                                required
                                name="question5"
                                rows={ 2 } 
                                className="w-[100%] p-2 rounded-[7.5px]"
                                value={ formData.question5 } 
                                onChange={ (e) => { 
                                    setFormData({ ...formData, question5: e.target.value })
                                } }
                            />
                        </div>
                        <div className="pb-8 flex gap-2 items-center">
                            <input 
                                name="consent"
                                value={ formData.consent }
                                checked={ formData.consent }
                                type="checkbox"
                                className="w-6 h-6 border-2 outline-4"
                                onChange={ (e) => {
                                    setFormData({ ...formData, consent: !formData.consent })
                                }}
                            />
                            
                            <p className="text-[#272635] text-sm md:text-md">Subscribe to newsletter.</p>
                        </div>
                    </form>
                    </>
                }
                { formStep === "loading" 
                    &&
                    <div className="min-h-[250px] flex items-center justify-center flex-col mb-4">
                        Sending your letter...
                    </div>
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
                    <>
                    { error === true 
                        &&
                        <p className="mb-4">Please make sure you've filled out the whole form!</p>
                    }
                    <div 
                        className="hover:cursor-pointer hover:scale-110 transition-all duration-[0.5s] rounded-[50px] bg-[#272635] text-[#EFDADD] p-4 min-w-[200px] text-center mb-4"
                        onClick={ handleStepTwoSubmit }
                    >
                        Submit
                    </div>
                    </>
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