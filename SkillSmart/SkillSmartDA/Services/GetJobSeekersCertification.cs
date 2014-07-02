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
    public class GetJobSeekersCertification : EntityService<Certification>, IGetJobSeekersCertification<SkillSmart.Dto.Certification>
    {
        public GetJobSeekersCertification(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.Certification> GetAllJobSeekersCertification(string id)
        {
            string[] split = id.Split(',');
            List<string> jobSeekerIdList = new List<string>();
            foreach (string item in split)
            {
                jobSeekerIdList.Add(item);
            }
            var jobSeekerWorkHistoryList = this.MongoCollection.AsQueryable<Certification>().Where(c => jobSeekerIdList.Contains(c.JobSeekerId));

            List<SkillSmart.Dto.Certification> jobSeekerWorkHostory = new List<SkillSmart.Dto.Certification>();
            foreach (Certification jobSeeker in jobSeekerWorkHistoryList)
            {
                SkillSmart.Dto.Certification jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.Certification, SkillSmart.Dto.Certification>(jobSeeker);
                jobSeekerWorkHostory.Add(jobSeekerObj);
            }
            return jobSeekerWorkHostory;
        }
    }
}
