import { useState } from "react";
import styled from "styled-components"

const StyledDiv = styled.div`
    height: 600px;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: lightblue; */
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

function SQLForm() {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showID, setShowID] = useState("");
    const [showUser, setShowUser] = useState("");
    const [showPass, setShowPass] = useState("");
    const [showRole, setShowRole] = useState("");
    const [showEmail, setShowEmail] = useState("");
    const [userData, setUserData] = useState(null);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        setShowID("");
        setShowPass("");
        setShowUser("");
        setShowRole("");
        setShowEmail("");
        setUserData(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setShowID("");
        setShowUser("");
        setShowPass("");
        setShowRole("");
        setShowEmail("");
        setUserData(null);

        const data = {
            username: username,
            password: password,
            isChecked: isChecked
        };

        try {
            const response = await fetch("https://drugi-projekt-uwuv.onrender.com/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result.res)
            setShowID(result.res[0].id)
            setShowUser(result.res[0].username)
            setShowPass(result.res[0].password)
            setShowRole(result.res[0].role)
            setShowEmail(result.res[0].email)
            setUserData(result.res)

        } catch (error) {
            console.log("Error while getting data!");
        }
        setUsername("")
        setPassword("")
    }

    return (
        <StyledDiv>
            <h1>SQL umetanje (SQL injection)</h1>
            <p><b>Upute</b>: Prikazujemo primjer SQL umetanja. Potrebno je upisati username i password te ako su podatci
            točni tada se prikazuju svi podaci o korisniku. Pokušavamo dohvatiti podatke o korisniku admin. Username je admin 
            i password je sifra123. Kada je ranjivost uključena pokušajte upisati "admin' or '1'='1" za username,
            i bilo koji password. Tada će se ispisati svi podaci o adminu bez obzira koji password bude upisan.
            U suprotnom svi podaci moraju biti točni kako bi se provela prijava.</p>
            <button
                className={`checkbox-button ${isChecked ? 'checked' : ''}`}
                onClick={handleToggle} style={{fontSize: "medium"}}
            >{isChecked ? 'Ranjivost uključena' : 'Ranjivost isključena'}
            </button>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></StyledInput>
                <StyledInput type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></StyledInput>
                <StyledButton type="submit">Prijava</StyledButton>
            </StyledForm>
            
            {/* {showUser && <p><b>{`Username: ${showUser}`}</b></p>}
            {showPass && <p><b>{`Password: ${showPass}`}</b></p>}
            {showRole && <p><b>{`Role: ${showRole}`}</b></p>}
            {showEmail && <p><b>{`Email: ${showEmail}`}</b></p>} */}
            {userData && userData.map((item, index) => (
               <p key={index}>
                {`{username: "${item.username}", password: "${item.password}", role: "${item.role}", email: "${item.email}"}`}
               </p> 
            ))}
        </StyledDiv>
    )  
}

export default SQLForm;