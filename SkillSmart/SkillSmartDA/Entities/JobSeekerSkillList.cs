using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobSeekerSkillList : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// SkillMapId
        /// </summary>
        [BsonElement("SkillMapId")]
        public string SkillMapId { get; set; }

        /// <summary>
        /// ProficiencyId
        /// </summary>
        [BsonElement("ProficiencyId")]
        public string ProficiencyId { get; set; }

        /// <summary>
        /// ExperienceId
        /// </summary>
        [BsonElement("ExperienceId")]
        public string ExperienceId { get; set; }

        /// <summary>
        /// SkillAcquiredId
        /// </summary>
        [BsonElement("SkillAcquiredId")]
        public string SkillAcquiredId { get; set; }

    }
}
