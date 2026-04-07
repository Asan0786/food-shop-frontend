import React from 'react'

const ContactUs = () => {
  return (
    <section className="py-5 bg-primary">
	<div className="container">
		<div className="row align-items-center justify-content-between">
			<div className="col-lg-6 bg-white p-5">
				<h2 className="display-6 fw-bold text-center mb-4">Contact Us</h2>
				<form>
					<div className="row">
						<div className="col-md-6">
							<div className="mb-3">
								<input className="form-control bg-light" placeholder="First name" type="text" />
							</div>
						</div>
						<div className="col-md-6">
							<div className="mb-3">
								<input className="form-control bg-light" placeholder="Last name" type="text"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="mb-3">
								<input className="form-control bg-light" placeholder="Email address" type="text"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="mb-3">
								<input className="form-control bg-light" placeholder="Phone number" type="text"/>
							</div>
						</div>
						<div className="col-md-12">
							<div className="mb-3">
								<textarea className="form-control bg-light" placeholder="Your message" rows="4"></textarea>
							</div>
						</div>
						<div className="col-md-4">
							<div className="d-grid">
								<button className="btn btn-primary" type="submit">Send message</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			
		</div>
	</div>
</section>
  )
}

export default ContactUs;
