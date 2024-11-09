import { useState } from "react";
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';

const StyledDiv = styled.div`
    height: 100%;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */
    padding: 10px;
    margin-left: 200px;
    margin-top: 50px;
`;

const StyledInput = styled.input`
    width: 300px;
    font-size: large;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    margin: 40px;
    gap: 50px;
`;

const StyledButton = styled.button`
    font-size: medium;
    padding: 5px;
`;

function BadAuth() {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showID, setShowID] = useState("");
    const [showUser, setShowUser] = useState("");
    const [showPass, setShowPass] = useState("");
    const [error, setError] = useState(""); 

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if(isChecked === true) {
            const data = {
                username: username,
                password: password
            };

            try {
                const response = await fetch("https://drugi-projekt-uwuv.onrender.com/login2", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log(result)

                if(result.input === 1) {
                    setError("Krivo upisani username!!!");
                } else if(result.input === 2) {
                    setError("Krivo upisani password!!!");
                } else if(result.input === 3) {
                    setError("Krivo upisani username i password!!!");
                }

                setShowID(result.res[0]?.id)
                setShowUser(result.res[0]?.username)
                setShowPass(result.res[0]?.password)

            } catch (error) {
                console.log(error)
            }
        } else{

            if (!captchaValue) {
                alert('Please complete the CAPTCHA');
                return;
            }
            // console.log(captchaValue)

            const data = {
                captchaValue: captchaValue,
                username: username,
                password: password
            }

            try {
                const response = await fetch("https://drugi-projekt-uwuv.onrender.com/recaptcha", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if(!response.ok) {
                    throw new Error("Error!")
                }

                if(result.res.length === 0) {
                    setError("Krivo upisani podaci!!!")
                }

                console.log(result.text)
                console.log(result.res)
                setShowID(result.res[0]?.id)
                setShowUser(result.res[0]?.username)
                setShowPass(result.res[0]?.password)

            } catch (error) {
                console.log(error)
            }
        }
        setUsername("")
        setPassword("")
    }

    const handleToggle = () => {
        setIsChecked(!isChecked);
        setError("");
        setShowID("");
        setShowPass("");
        setShowUser("");
    }

    return (
        <StyledDiv>
            <h1>Loša autentifikacija (Broken Authentication)</h1>
            <p><b>Upute</b>: Prikazujemo primjer loše autentifikacije. Potrebno je upisati username i password
            te rješiti CAPTCHA test koji razlikuje ljude od robota. Pokušavamo prijaviti korisnika admin.
            Upisujemo username admin i password sifra123. Kada je ranjivost isključena tada je potrebno rješiti
            CAPTCHA test. U suprotnom moguće je samo poznavanjem usernamea i passworda dohvatiti podatke što ovaj
            tip prijave čini ranjivim na automatizirane napade.</p>
            <button
                className={`checkbox-button ${isChecked ? 'checked' : ''}`}
                onClick={handleToggle} style={{fontSize: "medium"}}
            >{isChecked ? 'Ranjivost uključena' : 'Ranjivost isključena'}
            </button>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></StyledInput>
                <StyledInput type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></StyledInput>
                {!isChecked &&
                <ReCAPTCHA sitekey={process.env.SITE_KEY}
                onChange={(value) => setCaptchaValue(value)}/>}
                <StyledButton type="submit">Prijava</StyledButton>
            </StyledForm>
            {error && <p style={{color: "red"}}>{error}</p>}
            {showID && <p><b>{`Id: ${showID}`}</b></p>}
            {showUser && <p><b>{`Username: ${showUser}`}</b></p>}
            {showPass && <p><b>{`Password: ${showPass}`}</b></p>}
        </StyledDiv>
    )
}

export default BadAuth;