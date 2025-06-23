import React from 'react';

const CustomLoader = ({ text }) => {
  const darkMode = sessionStorage.getItem('darkMode');
  const isDarkMode = darkMode === 'true';
  const themeStyles = {
    light: {
      background: 'transparent',
      spinnerPrimary: '#9f9f9f',
      spinnerSecondary: '#d9bda5',
      textColor: '#2d3748'
    },
    dark: {
      background: '#2d3238',
      spinnerPrimary: '#9f9f9f',
      spinnerSecondary: '#d9bda5',
      textColor: '#f7fafc'
    }
  };

  const currentTheme = isDarkMode ? themeStyles.dark : themeStyles.light;

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full"
      style={{
        backgroundColor: currentTheme.background,
        borderRadius: 'inherit'
      }}
    >
      <div
        className="loader mb-1"
        style={{
          transform: 'rotateZ(45deg)',
          perspective: '1000px',
          borderRadius: '50%',
          width: 'clamp(40px, 5vw, 60px)',
          height: 'clamp(40px, 5vw, 60px)',
          color: currentTheme.spinnerPrimary,
          position: 'relative'
        }}
      >
        <div
          style={{
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'inherit',
            height: 'inherit',
            borderRadius: '50%',
            transform: 'rotateX(70deg)',
            animation: '1s spin linear infinite',
            zIndex: 700
          }}
        />
        <div
          style={{
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'inherit',
            height: 'inherit',
            borderRadius: '50%',
            color: currentTheme.spinnerSecondary,
            transform: 'rotateY(70deg)',
            animation: '1s spin linear infinite',
            animationDelay: '0.4s'
          }}
        />
      </div>
      {text && (
        <div
          className="text-center"
          style={{
            color: currentTheme.textColor,
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: 500,
            maxWidth: '90%'
          }}
        >
          {text}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0%, 100% {
            box-shadow: 0.2em 0 0 0 currentcolor;
          }
          12% {
            box-shadow: 0.2em 0.2em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 0.2em 0 0 currentcolor;
          }
          37% {
            box-shadow: -0.2em 0.2em 0 0 currentcolor;
          }
          50% {
            box-shadow: -0.2em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -0.2em -0.2em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0 -0.2em 0 0 currentcolor;
          }
          87% {
            box-shadow: 0.2em -0.2em 0 0 currentcolor;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomLoader;