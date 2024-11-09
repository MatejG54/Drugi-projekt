import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import SQLForm from "../ui/SQLForm";
// import BadAuth from "../ui/BadAuth";
// import { useEffect } from "react";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 100px; */
    height: 500px;
    /* margin: 50px; */
`;

const StyledHeader = styled.header`
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    border-bottom: 1px solid black;
    font-size: 40px;
    font-weight: 700;
    width: 100%;
`;

function MainPage() {
    return (
        <StyledDiv>
            <StyledHeader>Sigurnost</StyledHeader>
            <p><b>Odaberite koji sigurnosni napad želite isprobati!!!</b></p>
            <NavLink to="/sqlForm">Sql umetanje</NavLink>
            <NavLink to="/badAuth">Loša autentifikacija</NavLink>
        </StyledDiv>
    )
}

export default MainPage


// useEffect(() => {
//     const getAll = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/get", {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if(!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             // console.log(result[0].count)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     getAll();
// }, [])