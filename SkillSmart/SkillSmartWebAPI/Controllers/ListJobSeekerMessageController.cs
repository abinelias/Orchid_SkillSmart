using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class ListJobSeekerMessageController : ApiController
    {
        public IEnumerable<SkillSmart.Dto.ListJobSeekerMessage> GetAll(string jobSeekerId)
        {
            var allJobSeekerMessages = ServiceFactory.GetJobSekerMessages().GetAllJobSeekerMessages(jobSeekerId);
            var allCompanyList = ServiceFactory.GetCompany().GetAll();
            var allEmployerList = ServiceFactory.GetEmployers().GetAll();
            var allJobList = ServiceFactory.GetJobsList().GetAll();


            List<SkillSmart.Dto.ListJobSeekerMessage> jobSeekerMessageList = new List<SkillSmart.Dto.ListJobSeekerMessage>();
            foreach (JobSeekerMessage jobSeekerMessage in allJobSeekerMessages)
            {
                var companyId = "";
                var companyName = "";
                var companyLocation = "";
                foreach (Company company in allCompanyList)
                {
                    if (jobSeekerMessage.CompanyId == company.Id.ToString())
                    {
                        companyId = company.Id.ToString();
                        companyName = company.CompanyName;
                        companyLocation = company.City;
                    }
                }

                var employerId = "";
                var employerName = "";
                foreach (Employer employer in allEmployerList)
                {
                    if (jobSeekerMessage.EmployerId == employer.Id.ToString())
                    {
                        employerId = employer.Id.ToString();
                        employerName = employer.FirstName;
                    }
                }

                var JobId = "";
                var jobTitle = "";
                var jobPostingDate = "";
                foreach (JobsList job in allJobList)
                {
                    if (jobSeekerMessage.JobId == job.Id.ToString())
                    {
                        JobId = job.Id.ToString();
                        jobTitle = job.JobPosition;
                        jobPostingDate = job.PostingDate;
                    }
                }


                SkillSmart.Dto.ListJobSeekerMessage jobSeekerMessageObj = new SkillSmart.Dto.ListJobSeekerMessage();

                jobSeekerMessageObj.CompanyId = companyId;
                jobSeekerMessageObj.CompanyName = companyName;
                jobSeekerMessageObj.CompanyLocation = companyLocation;
                jobSeekerMessageObj.EmployerId = employerId;

                jobSeekerMessageObj.EmployerName = employerName;
                jobSeekerMessageObj.JobSeekerId = jobSeekerMessage.JobSeekerId;

                jobSeekerMessageObj.MessageID = jobSeekerMessage.Id.ToString();
                jobSeekerMessageObj.MessageSubject = jobSeekerMessage.Subject;
                jobSeekerMessageObj.MessageDetails = jobSeekerMessage.Message;
                jobSeekerMessageObj.MessageSentDate = jobSeekerMessage.Date;
                jobSeekerMessageObj.SkillScore = "68";

                jobSeekerMessageObj.JobId = JobId;
                jobSeekerMessageObj.JobTitle = jobTitle;
                jobSeekerMessageObj.JobPostedDate = jobPostingDate;

                jobSeekerMessageList.Add(jobSeekerMessageObj);
            }
            return jobSeekerMessageList;
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}