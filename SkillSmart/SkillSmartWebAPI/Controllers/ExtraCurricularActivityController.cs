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
    public class ExtraCurricularActivityController : ApiController
    {

        /// <summary>
        /// To get all extra Curricular activities of jobseeker related to an education details
        /// </summary>
        /// <returns>ExtraCurricular Activity List</returns>
        public IEnumerable<ExtraCurricularActivity> GetAllExtraCurricularActivityById(string jobSeekerId)
        {
            return ServiceFactory.GetJobSeekerExtraCurricularActivityService().GetAllExtraCurricularActivityById(jobSeekerId);
        }

        /// <summary>
        /// To get an extra Curricular activity details of a jobseeker related to an education details
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <returns>ExtraCurricularActivity Object</returns>
        public ExtraCurricularActivity Get(string id)
        {
            return ServiceFactory.GetJobSeekerExtraCurricularActivityService().GetById(id);
        }

        /// <summary>
        /// To get create an extra Curricular activity of jobseeker related to an education details
        /// </summary>
        /// <param name="extraCurricularActivityObj">extraCurricularActivity Object</param>
        public string Post(ExtraCurricularActivity extraCurricularActivityObj)
        {
            
            ServiceFactory.GetJobSeekerExtraCurricularActivityService().Create(extraCurricularActivityObj);
            return extraCurricularActivityObj.Id.ToString();
        }

        /// <summary>
        /// To Update extra curricular activity details
        /// </summary>
        /// <param name="id">ExtraCurricularActivityId</param>
        /// <param name="extraCurricularActivityObj">extraCurricularActivity Object</param>
        public void Put(string id, ExtraCurricularActivity extraCurricularActivityObj)
        {
            try
            {
                extraCurricularActivityObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerExtraCurricularActivityService().Update(extraCurricularActivityObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To Delete extra curricular activity details
        /// </summary>
        /// <param name="id">ExtraCurricularActivityId</param>
        public void Delete(string id)
        {
            IExtraCurricularActivityService<ExtraCurricularActivity> jobSeekerService = ServiceFactory.GetJobSeekerExtraCurricularActivityService();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}