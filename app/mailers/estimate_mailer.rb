class EstimateMailer < ApplicationMailer
  default from: "studiobiddertest@gmail.com"

  layout "mailer"

  def estimate_email(estimate)
    @estimate = estimate
    mail(to: estimate[:customer_email], subject: 'Sample Email')
  end
end
