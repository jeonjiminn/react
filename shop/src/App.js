import logo from "./logo.svg";
import "./App.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import data from "./data.js";
import { useState } from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Detail";
import nike from './nike';


function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [res1, setRes1] = useState([0,1,2,3,4,5,6,7,8]);
  let [nike10, setNike10] = useState(nike);
  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">슈마커</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/About')}}>About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="slider"></div>

                <Title/>

                <Button variant="outline-primary" onClick={()=>{
                  let copy3 = [...shoes].sort((a,b)=>a.title > b.title ? 1 : -1,);

                  setShoes(copy3);
                  shoes = copy3;

                  var res = [];
                  for (let i in shoes){
                    res.push(shoes[i].id);
                  }

                  setRes1(res1=res);
                }}>이름순정렬</Button>{''}

                <Button variant="outline-secondary" onClick={()=>{
                  let copy4 = [...shoes].sort((a,b)=>a.price > b.price ? 1 : -1,);

                  setShoes(copy4);
                  shoes = copy4;

                  var res = [];
                  for (let i in shoes){
                    res.push(shoes[i].id);
                  }

                  setRes1(res1=res);
                }}>낮은가격순 정렬</Button>{''}

                <Button variant="outline-success" onClick={()=>{
                  let copy5 = [...shoes].sort((a,b)=>b.price > a.price ? 1 : -1,);

                  setShoes(copy5);
                  shoes = copy5;

                  var res = [];
                  for (let i in shoes){
                    res.push(shoes[i].id);
                  }

                  setRes1(res1=res);
                }}>높은가격순 정렬</Button>{''}

                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Product shoes={shoes[i]} res1={res1} i={i} />;
                    })}
                  </div>
                </div>

                <Title2/>
                
                <Button variant="outline-success">+ 3개 상품 더보기</Button>{''}

                <div className="container" style={{marginTop:'30px'}}>
                  <div className="row">
                    {
                      nike10.map((ele,i)=>{
                        return(
                          <Nike nike10={nike10[i]}/>
                        )
                      })
                    }
                  </div>
                </div>

              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />

          <Route path="/About" element={<About/>}>
            <Route path="member" element={<div>멤버</div>}/>
            <Route path="location" element={<div>위치</div>}/>
          </Route>
          
        </Routes>

        <Footer/>
      </>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <Nav.Link onClick={()=>{navigate('/detail/'+ props.res1[props.i])}} className='c1'>
        <img src={props.shoes.imgUrl} width="80%" />
        <h4>{props.shoes.title}</h4>
        <span>{props.shoes.content}</span>
        <p>{props.shoes.price}</p>
      </Nav.Link>
    </div>
  );
}

function About(){
  return(
    <>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </>
  )
}

const Title = () => {
  let csst1 = {
    marginTop: "70px",
    textAlign: "center"
  }

  return(
    <>
      <h3 style={csst1}>MD's Pick</h3>
      <p style={{textAlign:"center"}}>시선을 사로잡는 스타일링, 제품들을 만나보세요.</p>
    </>
  )
}

const Title2 = () => {
  let csst1 = {
    marginTop: "70px"
  }

  return(
    <>
      <h3 style={csst1}>여름을 위한 썸머 컬렉션</h3>
      <p>가볍게, 시원하게 썸머 컬렉션으로 여름을 준비해 보세요.</p>
    </>
  )
}

function Nike(props){
  return(
    <div className="col-md-4">
      <img src={props.nike10.imgUrl} width="80%" />
      <h4>{props.nike10.title}</h4>
      <span>{props.nike10.content}</span>
      <p>{props.nike10.price}</p>
    </div>
  )
}

const Footer = () => {
  let foo = {
    color:"#fff",
    backgroundColor:"#000",
    padding:"20px, 0px",
    marginTop:"80px"
  }
  return(
    <>
      <p style={foo}>COPYRIGHT(C) 2022 Nike, Inc. All Rights Reserved</p>
    </>
  )
}

export default App;
