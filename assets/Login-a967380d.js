import{r,e as u,d as p,j as s,B as f}from"./index-56d039c7.js";import{P as x}from"./PageNav-19b86108.js";import"./Logo-a988aaf2.js";const h="_login_1mydq_1",g="_form_1mydq_8",j="_row_1mydq_22",a={login:h,form:g,row:j};function _(){const[t,n]=r.useState("jack@example.com"),[o,l]=r.useState("qwerty"),{isAuthenticated:i,login:m}=u(),c=p();function d(e){e.preventDefault(),t&&o&&m(t,o)}return r.useEffect(function(){i&&c("/app",{replace:!0})},[i]),s.jsxs("main",{className:a.login,children:[s.jsx(x,{}),s.jsxs("form",{className:a.form,onSubmit:d,children:[s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"email",children:"Email address"}),s.jsx("input",{type:"email",id:"email",onChange:e=>n(e.target.value),value:t})]}),s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{type:"password",id:"password",onChange:e=>l(e.target.value),value:o})]}),s.jsx("div",{children:s.jsx(f,{type:"primary",children:"Login"})})]})]})}export{_ as default};