# Preview all emails at http://localhost:3000/rails/mailers/estimate_mailer
class EstimateMailerPreview < ActionMailer::Preview
  def estimate_mail_preview
    EstimateMailer.estimate_email()
  end
end
