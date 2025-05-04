import React from 'react';
import classNames from 'classnames';

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames("bg-white rounded-lg shadow-md", className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames("p-4", className)}>
      {children}
    </div>
  );
};
