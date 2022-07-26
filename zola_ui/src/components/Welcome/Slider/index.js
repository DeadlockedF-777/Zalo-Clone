import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { slideWelcome } from './slideData';
import { useRef, useState, useEffect } from 'react';
import SlideDots from './SlideDots';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const cx = classNames.bind(styles);

function Slider() {
	const slideContainerRef = useRef();
	let offsetRef = useRef(1);
	const [currentSlide, setCurrentSlide] = useState(offsetRef.current);

	useEffect(() => {
		const id = setInterval(() => {
			handleChangeSlide('next');
		}, 4000);

		return () => clearInterval(id);
	}, []);

	const handleChangeSlide = (type, offset) => {
		switch (type) {
			case 'prev':
				offsetRef.current--;
				if (offsetRef.current <= 0) {
					offsetRef.current = 7;
				}
				let posPrev = -(offsetRef.current - 1) * 100;

				setCurrentSlide(offsetRef.current);
				slideContainerRef.current.style.transform = `translateX(${posPrev}%)`;
				break;
			case 'next':
				offsetRef.current++;
				if (offsetRef.current >= 8) {
					offsetRef.current = 1;
				}
				let posNext = -(offsetRef.current - 1) * 100;

				setCurrentSlide(offsetRef.current);
				slideContainerRef.current.style.transform = `translateX(${posNext}%)`;
				break;
			default:
				offsetRef.current = offset;
				let step = -(offsetRef.current - 1) * 100;
				setCurrentSlide(offsetRef.current);
				slideContainerRef.current.style.transform = `translateX(${step}%)`;
		}
	};
	return (
		<div className={cx('slider')}>
			<button className={cx('slider-btn', 'prev')} onClick={() => handleChangeSlide('prev')}>
				<BsChevronLeft />
			</button>
			<button className={cx('slider-btn', 'next')} onClick={() => handleChangeSlide('next')}>
				<BsChevronRight />
			</button>
			<div className={cx('slider-inner')} ref={slideContainerRef}>
				{slideWelcome.map((slide) => {
					return (
						<div key={slide.id} className={cx('slide-item')}>
							<img src={slide.img} alt="slide" className={cx('slide-img')} />
							<div className={cx('slide-content')}>
								<span className={cx('slide-title')}>{slide.title}</span>
								<span className={cx('slide-description')}>{slide.description}</span>
							</div>
						</div>
					);
				})}
			</div>
			<SlideDots
				slides={slideWelcome}
				handleChangeSlide={handleChangeSlide}
				currentSlide={currentSlide}
			/>
		</div>
	);
}

export default Slider;
