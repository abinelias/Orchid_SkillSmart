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

        /// <summary>
        /// To get all certifications of jobseeker
        /// </summary>
        /// <returns>Certification list of jobseeker</returns>
        public IEnumerable<Certification> GetJobSeekerCertificationById(string jobSeekerId)
        {
            return ServiceFactory.GetJobSeekerCertification().GetJobSeekerCertificationById(jobSeekerId);
        }

        /// <summary>
        /// To get all certification details of the jobseeker
        /// </summary>
        /// <param name="id">certification Id</param>
        /// <returns></returns>
        public Certification Get(string id)
        {
            return ServiceFactory.GetJobSeekerCertification().GetById(id);
        }

        /// <summary>
        /// To insert jobseeker certification details
        /// </summary>
        /// <param name="jobSeekerCertificationObj">certification object</param>
        public string Post(Certification jobSeekerCertificationObj)
        {
           
                ServiceFactory.GetJobSeekerCertification().Create(jobSeekerCertificationObj);
                return jobSeekerCertificationObj.Id.ToString();
        }

        /// <summary>
        /// To update jobseeker certification details
        /// </summary>
        /// <param name="id">sertificationId</param>
        /// <param name="jobSeekerCertificationObj">certification object</param>
        public void Put(string id, Certification jobSeekerCertificationObj)
        {
            try
            {
                jobSeekerCertificationObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerCertification().Update(jobSeekerCertificationObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete jobseeker certification details
        /// </summary>
        /// <param name="id">Certification Id</param>
        public void Delete(string id)
        {
            ICertificationService<Certification> jobSeekerCertificationService = ServiceFactory.GetJobSeekerCertification();
            var jobSeekerCertificationObj = jobSeekerCertificationService.GetById(id);
            jobSeekerCertificationService.Delete(jobSeekerCertificationObj);  
        }
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}