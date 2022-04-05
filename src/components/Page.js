import React, { forwardRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import track from "../utils/analytics";

const Page = forwardRef(
  (
    {
      children,
      title = "",
      content,
      og_description,
      og_image,
      og_title,
      og_type,
      og_url,
      ...rest
    },
    ref
  ) => {
    const location = useLocation();

    const sendPageViewEvent = useCallback(() => {
      track.pageview({
        page_path: location.pathname,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={content} />
          <meta property="og:url" content={og_url} />
          <meta property="og:type" content={og_type} />
          <meta property="og:title" content={og_title} />
          <meta property="og:description" content={og_description} />
          <meta property="og:image" content={og_image} />
        </Helmet>
        {children}
      </div>
    );
  }
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
