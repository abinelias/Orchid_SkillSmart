using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobsList : MongoEntity
    {

        /// <summary>
        /// JobPosition
        /// </summary>
        [BsonElement("JobPosition")]
        public string JobPosition { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        [BsonElement("CompanyId")]
        public string CompanyId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }

        /// <summary>
        /// JobLocation
        /// </summary>
        [BsonElement("JobLocation")]
        public string JobLocation { get; set; }

        /// <summary>
        /// PostingDate
        /// </summary>
        [BsonElement("PostingDate")]
        public string PostingDate { get; set; }

        /// <summary>
        /// JobViews
        /// </summary>
        [BsonElement("JobViews")]
        public int JobViews { get; set; }

        /// <summary>
        /// ApplicantsNumber
        /// </summary>
        [BsonElement("ApplicantsNumber")]
        public int ApplicantsNumber { get; set; }

        /// <summary>
        /// ApplicantAverage
        /// </summary>
        [BsonElement("ApplicantAverage")]
        public int ApplicantAverage { get; set; }

        /// <summary>
        /// JobSalary
        /// </summary>
        [BsonElement("JobSalary")]
        public string JobSalary { get; set; }

        /// <summary>
        /// JobType
        /// </summary>
        [BsonElement("JobType")]
        public string JobType { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        [BsonElement("JobDescription")]
        public string JobDescription { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [BsonElement("StartDate")]
        public DateTime StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [BsonElement("EndDate")]
        public DateTime EndDate { get; set; }

        /// <summary>
        /// NoOfOpenings
        /// </summary>
        [BsonElement("NoOfOpenings")]
        public int NoOfOpenings { get; set; }

        /// <summary>
        /// PublishId
        /// </summary>
        [BsonElement("PublishId")]
        public int PublishId { get; set; }

    }
}
