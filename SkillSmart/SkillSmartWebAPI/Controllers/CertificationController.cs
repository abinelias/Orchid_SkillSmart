using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class CertificationController : ApiController
    {

        public IEnumerable<Certification> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerCertification().GetJobSeekerCertification("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public Certification Get(string id)
        {
            return ServiceFactory.GetJobSeekerCertification().GetById(id);
        }

        public void Post(Certification jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerCertification().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, Certification jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerCertification().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ICertificationService<Certification> jobSeekerService = ServiceFactory.GetJobSeekerCertification();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}