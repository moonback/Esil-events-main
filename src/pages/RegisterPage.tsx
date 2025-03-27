import React from 'react';
import RegisterForm from '../components/RegisterForm';
import SEO from '../components/SEO';

const RegisterPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Inscription | Esil Events"
        description="Créez votre compte pour accéder à toutes les fonctionnalités d'Esil Events."
      />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;