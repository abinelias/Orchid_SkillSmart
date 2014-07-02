using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class GetJobSeekersEducation : EntityService<Education>, IGetJobSeekersEducation<SkillSmart.Dto.Education>
    {
        public GetJobSeekersEducation(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.Education> GetAllJobSeekersEducation(string id)
        {
            string[] split = id.Split(',');
            List<string> jobSeekerIdList = new List<string>();
            foreach (string item in split)
            {
                jobSeekerIdList.Add(item);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<Education>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));

            List<SkillSmart.Dto.Education> jobSeekerWorkHostory = new List<SkillSmart.Dto.Education>();
            foreach (Education jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.Education jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Education, SkillSmart.Dto.Education>(jobSeeker);
                jobSeekerWorkHostory.Add(jobSeekerObj);
            }
            return jobSeekerWorkHostory;
        }
    }
}
