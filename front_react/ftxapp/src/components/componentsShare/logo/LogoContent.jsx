import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

/**
 * Helper simple para concatenar clases Css 
 * Acepta strings, arrays o falsy values.
 */
function cx(...inputs) {
  return inputs.flat().filter(Boolean).join(' ');
}


/* src: ruta de la imagen del logo.
brandName: texto que se muestra junto al logo.
to: ruta a la que apunta el logo; por defecto '/'. Si no querés que sea link, podés pasar to={null} 
className, textClassName, imageClassName: clases extra para personalizar contenedor, texto e imagen respectivamente.
size: 'sm' | 'md' | 'lg' para controlar tamaños; por defecto 'md'. */
export default function Logo({
  src,
  brandName,
  to = '/',
  className,
  textClassName,
  imageClassName,
  size = 'md'
}) {
  const sizeClasses = {
    sm: { image: 'logo-img-sm', text: 'h6' },
    md: { image: 'logo-img-md', text: 'h5' },
    lg: { image: 'logo-img-lg', text: 'h4' }
  };

  const LogoContent = (
    <div className={cx('d-flex align-items-center', className)}>
      <img
        src={src}
        alt={`${brandName} logo`}
        className={cx('me-2', sizeClasses[size].image, imageClassName)}
      />
      <span className={cx('fw-bold mb-0', sizeClasses[size].text, textClassName)}>
        {brandName}
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="text-decoration-none hover-opacity">
        {LogoContent}
      </Link>
    );
  }

  return Logo;
}
