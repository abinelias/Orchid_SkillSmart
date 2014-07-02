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
    public class ListJobSkillsController : ApiController
    {

        public IEnumerable<SkillSmart.Dto.ListJobSkills> GetAll()
        {
            var jobId = "";
            var alljobSkills = ServiceFactory.GetJobSkills().GetAll(jobId);
            var allSkillList = ServiceFactory.GetSkill().GetAll();
            var allSkillMap = ServiceFactory.GetSkillMap().GetAllSkillMap();


            List<SkillSmart.Dto.ListJobSkills> jobSkillList = new List<SkillSmart.Dto.ListJobSkills>();
            foreach (JobSkills jobSkill in alljobSkills)
            {
                foreach (SkillMap skillMap in allSkillMap)
                {
                    if (jobSkill.SkillMapId == skillMap.Id.ToString())
                    {
                        var skillId = skillMap.SkillId;
                        var skillName = "";

                        foreach (Skill skill in allSkillList)
                        {
                            if (skill.Id.ToString() == skillId)
                            {
                                skillName = skill.SkillName;
                                break;
                            }
                        }

                        SkillSmart.Dto.ListJobSkills jobSeekerskillObj = new SkillSmart.Dto.ListJobSkills();

                        jobSeekerskillObj.SkillId = skillId;
                        jobSeekerskillObj.SkillName = skillName;
                        jobSeekerskillObj.JobId = jobSkill.JobId;
                        jobSeekerskillObj.SkillScore = jobSkill.SkillScore;
                        jobSeekerskillObj.SkillImportance = jobSkill.SkillImportance;

                        jobSeekerskillObj.SkillMapId = jobSkill.SkillMapId;
                        jobSeekerskillObj.Id = jobSkill.Id.ToString();

                        jobSkillList.Add(jobSeekerskillObj);
                        break;
                    }
                }
            }
            return jobSkillList;
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}