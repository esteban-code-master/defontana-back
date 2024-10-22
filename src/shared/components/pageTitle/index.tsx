'use client';
import { Typography } from '@material-tailwind/react';
import { FunctionComponent } from 'react';
import { PageTitleProps } from './props';

export const PageTitle: FunctionComponent<PageTitleProps> = ({
  title,
  subtitle
}) => {
  return (
    <>
      <Typography variant="h1" className="text-3xl font-sans text-primary">
        {title}
      </Typography>
      <Typography
        variant="h2"
        className="text-sm font-sans font-extralight text-secondary"
      >
        {subtitle}
      </Typography>
    </>
  );
};
