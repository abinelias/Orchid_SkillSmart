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
    public class GetJobSeekersOverviewService : EntityService<Overview>, IGetJobSeekersOverview<SkillSmart.Dto.Overview>
    {
        public GetJobSeekersOverviewService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.Overview> GetAllJobSeekersOverview(string id)
        {
            string[] split = id.Split(',');
            List<string> jobSeekerIdList = new List<string>();
            foreach (string item in split)
            {
                jobSeekerIdList.Add(item);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<Overview>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));

            List<SkillSmart.Dto.Overview> jobSeekersOverview = new List<SkillSmart.Dto.Overview>();
            foreach (Overview jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.Overview jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Overview, SkillSmart.Dto.Overview>(jobSeeker);
                jobSeekersOverview.Add(jobSeekerObj);
            }
            return jobSeekersOverview;
        }
    }
}

