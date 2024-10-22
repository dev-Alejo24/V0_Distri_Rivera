import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const Login = ({ logo }) => {
    const clientLoginGoogleId = '280023233018-dlrh46gjnq2pfa4o5hu43b4u7k7enm6d.apps.googleusercontent.com';
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // mensaje de error
    const navigate = useNavigate();

    // Inicializar Google API
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientLoginGoogleId,
            });
        };
        gapi.load("client:auth2", start);
    }, []);

    // Manejo del inicio de sesión
    const onSuccess = (response) => {
        setUser(response.profileObj);
        console.log("Inicio de sesión exitoso:", response.profileObj);
        navigate('/home'); // Redirigir al usuario a la página principal
    };

    // Manejo del fallo en el inicio de sesión
    const onFailure = () => {
        console.error("Error durante el inicio de sesión con Google.");
    };

    // Cerrar sesión
    const handleLogout = () => {
        setUser(null);
    };

    // Envío del formulario de inicio de sesión
    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica de validación del usuario
        // Aquí puedes agregar la lógica para autenticar el usuario
        const isValidUser = false; // Cambiar a true si el usuario es válido

        if (!isValidUser) {
            setErrorMessage('Email o contraseña incorrectos.'); // Establecer mensaje de error
            setTimeout(() => {
                setErrorMessage(''); // Limpiar el mensaje después de 3 segundos
            }, 3000);
            return;
        }

        // Si la autenticación es exitosa
        console.log('Email:', email);
        console.log('Password:', password);
        navigate('/home'); // Redirigir al usuario a la página principal
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {logo && <img src={logo} alt="Logo" className="logo" />} {/* Logo en la parte superior */}
                <h2>Iniciar Sesión</h2>

                {/* Mostrar mensaje de error si existe */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {/* Formulario de inicio de sesión */}
                {!user ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingrese su correo electrónico"
                                required
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                required
                                className="form-control"
                            />
                        </Form.Group>

                        <div className="btn">
                            <Button type="submit">Iniciar Sesión</Button>
                        </div>

                        <div className="separator">ó</div>

                        <GoogleLogin
                            clientId={clientLoginGoogleId}
                            buttonText="Iniciar sesión con Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            className="btn-google" // Agregar clase para estilo
                        />
                    </Form>
                ) : (
                    <div>
                        <h3>Bienvenido, {user.name}!</h3>
                        <Button onClick={handleLogout}>Cerrar sesión</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
