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
    public class ScholarshipController : ApiController
    {

        /// <summary>
        /// To get all Scholarship of jobseeker related to an education details
        /// </summary>
        /// <returns>list of Scholarship</returns>
        public IEnumerable<Scholarship> GetAllScholarshipById()
        {
            return ServiceFactory.GetJobSeekerScholarship().GetAllScholarshipById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        /// <summary>
        /// To get a schoarship details of a jobseeker related to an education details
        /// </summary>
        /// <param name="id">ScholarshipId</param>
        /// <returns>Scholarship object</returns>
        public Scholarship Get(string id)
        {
            return ServiceFactory.GetJobSeekerScholarship().GetById(id);
        }

        /// <summary>
        /// To create a schoarship details for a jobseeker related to an education details
        /// </summary>
        /// <param name="scholarshipObj">scholarship Object</param>
        public void Post(Scholarship scholarshipObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerScholarship().Create(scholarshipObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update Scholarship details
        /// </summary>
        /// <param name="id">scholarshipId</param>
        /// <param name="scholarshipObj">scholarship Object</param>
        public void Put(string id, Scholarship scholarshipObj)
        {
            try
            {
                scholarshipObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerScholarship().Update(scholarshipObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete Scholarship details
        /// </summary>
        /// <param name="id">ScholarshipId</param>
        public void Delete(string id)
        {
            IScholarshipService<Scholarship> jobSeekerService = ServiceFactory.GetJobSeekerScholarship();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}