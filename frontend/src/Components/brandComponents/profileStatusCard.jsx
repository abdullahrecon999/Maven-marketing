import React from 'react';

export const ProfileStatusCard = ({openProfile}) => {
	return (
		<div className="flex justify-between items-center py-5">
			<div data-theme="corporate" className="card w-9/12 bg-base-100 shadow-xl">
				<div className="card-body flex-row w-5/6 p-3">
					<div className="flex-col">
						<h3 className="card-title">Profile Completion</h3>
						<p className="text-sm">Complete your profile to attract influencers and build trust</p>
					</div>
					<div className="flex-col justify-center items-center">
						<div className="flex h-16 w-96 gap-10 justify-center">
							<div className="tooltip tooltip-bottom flex" data-tip="Basic Info">
								<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
									<g id="color">
										<path fill="#D9D9D9" d="M36.2002,13.3163c-12.5719,0-22.7998,10.2279-22.7998,22.7998c0,12.5718,10.2279,22.7998,22.7998,22.7998 C48.772,58.9159,59,48.6879,59,36.1161C59,23.5442,48.772,13.3163,36.2002,13.3163z" />
									</g>
									<g id="hair" />
									<g id="skin" />
									<g id="skin-shadow" />
									<g id="line">
										<circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" />
										<path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m44.7 43.92c-6.328-1.736-11.41-0.906-17.4 1.902" />
										<path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
										<path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
									</g>
								</svg>
							</div>

							<div className="tooltip tooltip-bottom flex" data-tip="Can be completed">
								<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
									<g id="color">
										<path fill="#FCEA2B" d="M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z" />
									</g>
									<g id="hair" />
									<g id="skin" />
									<g id="skin-shadow" />
									<g id="line">
										<circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" />
										<line x1="27" x2="45" y1="43" y2="43" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" />
										<path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
										<path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
									</g>
								</svg>
							</div>

							<div className="tooltip tooltip-bottom flex" data-tip="All Details added!">
								<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
									<g id="color">
										<circle cx="36" cy="36" r="23" fill="#D9D9D9" />
										<path fill="#FFFFFF" d="M50.595,41.64c0.012,1.5397-0.2838,3.0662-0.87,4.49c-12.49,3.03-25.43,0.34-27.49-0.13 c-0.5588-1.3852-0.8407-2.8664-0.83-4.36h0.11c0,0,14.8,3.59,28.89,0.07L50.595,41.64z" />
										<path fill="#D9D9D9" d="M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23c-7.41,0-12.03-3.03-13.8-7.36 C24.2951,46.47,37.235,49.16,49.7251,46.13z" />
									</g>
									<g id="hair" />
									<g id="skin" />
									<g id="skin-shadow" />
									<g id="line">
										<circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
										<path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M50.595,41.64 c0.012,1.5397-0.2838,3.0662-0.87,4.49c-12.49,3.03-25.43,0.34-27.49-0.13c-0.5588-1.3852-0.8407-2.8664-0.83-4.36h0.11 c0,0,14.8,3.59,28.89,0.07L50.595,41.64z" />
										<path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M49.7251,46.13 c-1.79,4.27-6.35,7.23-13.69,7.23c-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13z" />
										<path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
										<path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
									</g>
								</svg>
							</div>

						</div>

						<div className="flex h-auto w-full items-center gap-5">
							<progress className="progress progress-warning w-full -orange-700" value="45" max="100"></progress>
							<p className="text-3xl font-mono text-yellow-300">50%</p>
						</div>
					</div>
					<div className="flex items-center">
						<button className="btn btn-outline btn-primary" onClick={openProfile}>Complete Profile</button>
					</div>
				</div>
			</div>
		</div>
	);
};