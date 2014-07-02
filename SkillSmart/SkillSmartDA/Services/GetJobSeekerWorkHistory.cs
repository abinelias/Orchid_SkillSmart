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
    public class GetJobSeekerWorkHistory : EntityService<WorkHistory>, IGetJobSeekersWorkHistory<SkillSmart.Dto.WorkHistory>
    {
        public GetJobSeekerWorkHistory(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.WorkHistory> GetAllJobSeekersWorkHistory(string id)
        {
            string[] split = id.Split(',');
            List<string> jobSeekerIdList = new List<string>();
            foreach (string item in split)
            {
                jobSeekerIdList.Add(item);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<WorkHistory>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));

            List<SkillSmart.Dto.WorkHistory> jobSeekerWorkHostory = new List<SkillSmart.Dto.WorkHistory>();
            foreach (WorkHistory jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.WorkHistory jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.WorkHistory, SkillSmart.Dto.WorkHistory>(jobSeeker);
                jobSeekerWorkHostory.Add(jobSeekerObj);
            }
            return jobSeekerWorkHostory;
        }
    }
}
