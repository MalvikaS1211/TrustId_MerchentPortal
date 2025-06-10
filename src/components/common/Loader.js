import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full ">
            <div
                className="loader"
                style={{
                    transform: 'rotateZ(45deg)',
                    perspective: '1000px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    color: '#9f9f9f',
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
                        color: '#d9bda5',
                        transform: 'rotateY(70deg)',
                        animation: '1s spin linear infinite',
                        animationDelay: '0.4s'

                    }}
                />
            </div>

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

export default Loader;