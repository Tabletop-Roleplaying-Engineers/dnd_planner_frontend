import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import pdfFile from './Info.pdf';

export const InfoViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [canvasSize, setCanvasSize] = useState();
  const [timer, setTimer] = useState();
  const onDocumentComplete = () => {
    console.log('=-= onDocumentComplete')
  }

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = (
      <li className="previous" onClick={() => setPage(page - 1)}>
        <a href="#">
          <i className="fa fa-arrow-left"></i> Previous
        </a>
      </li>
    );
    if (page === 1) {
      previousButton = (
        <li className="previous disabled">
          <a href="#">
            <i className="fa fa-arrow-left"></i> Previous
          </a>
        </li>
      );
    }
    let nextButton = (
      <li className="next" onClick={() => setPage(page + 1)}>
        <a href="#">
          Next <i className="fa fa-arrow-right"></i>
        </a>
      </li>
    );
    if (page === pages) {
      nextButton = (
        <li className="next disabled">
          <a href="#">
            Next <i className="fa fa-arrow-right"></i>
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  };

  const canvasEl = useRef(null);
  const containerEl = useRef(null);

  useLayoutEffect(() => {
    console.log('=-= canvasSize', canvasSize)
    if (!loading && !canvasSize && !timer) {
      console.log('=-= canvasSize 2')
      setTimer(
        setTimeout(() => {
          const canvasWidth = canvasSize || canvasEl.current.offsetWidth;
          const containerWidth = containerEl.current.offsetWidth;
          console.log('=-= canvasWidth', canvasWidth)
          console.log('=-= containerWidth', containerWidth)
          setCanvasSize(canvasEl.current.offsetWidth)
          const scale = containerWidth / canvasWidth
          console.log('=-= scale', scale)
          setScale(scale)
        }, 1000)
      )
    }
  })

  const [loading, numPages] = usePdf({
    file: pdfFile,
    onDocumentComplete,
    page,
    canvasEl,
    scale,
  });

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div ref={containerEl}>
      {loading && <span>Loading...</span>}
      <canvas style={{ margin: 'auto', display: 'block' }} ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
};
