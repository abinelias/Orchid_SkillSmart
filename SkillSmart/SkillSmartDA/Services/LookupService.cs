﻿using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class LookupService : EntityService<LookupEntity>, ILookupService<SkillSmart.Dto.LookupDto>
    {
        public LookupService(MongoDatabase mongoDatabase, string collectionName)
            : base(mongoDatabase, collectionName)
        { }

        /// <summary>
        /// Function to get all details of lookup table
        /// </summary>
        /// <returns>object of lookup collection</returns>
        public IEnumerable<SkillSmart.Dto.LookupDto> GetAll()
        {
            var DropList = this.MongoCollection.FindAllAs<LookupEntity>();

            List<SkillSmart.Dto.LookupDto> listCursor = new List<SkillSmart.Dto.LookupDto>();
            foreach (LookupEntity list in DropList)
            {
                SkillSmart.Dto.LookupDto listObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.LookupEntity, SkillSmart.Dto.LookupDto>(list);
                listCursor.Add(listObj);
            }
            return listCursor;
        }

        /// <summary>
        /// Function to create a collection for lookup
        /// </summary>
        /// <param name="entity">lookup object</param>
        public void Create(SkillSmart.Dto.LookupDto entity)
        {
            LookupEntity seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.LookupDto, SkillSmartMongoDA.Entities.LookupEntity>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// FUnction to get lookUp collection name by Id
        /// </summary>
        /// <param name="id">lookUp CollectionId</param>
        /// <returns>LookupDto object</returns>
        public new SkillSmart.Dto.LookupDto GetById(string id)
        {
            LookupEntity dbObj = base.GetById(id);
            SkillSmart.Dto.LookupDto seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.LookupEntity, SkillSmart.Dto.LookupDto>(dbObj);
            return seeker;
        }

        public void Update(SkillSmart.Dto.LookupDto entity)
        {
            
        }

        public void Delete(SkillSmart.Dto.LookupDto entity)
        {
           
        }
    }
}
