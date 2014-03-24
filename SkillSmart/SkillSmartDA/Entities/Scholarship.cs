using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Scholarship : MongoEntity
    {
        /// <summary>
        /// EducationId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// ScholarshipCheck
        /// </summary>
        [BsonElement("Scholarship")]
        public string ScholarshipCheck { get; set; }

        /// <summary>
        /// Title
        /// </summary>
        [BsonElement("ScholarshipTitle")]
        public string ScholarshipTitle { get; set; }

        /// <summary>
        /// ScholarshipDescription
        /// </summary>
        [BsonElement("ScholarshipDescription")]
        public string ScholarshipDescription { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        [BsonElement("Value")]
        public string Value { get; set; }

    }
}
